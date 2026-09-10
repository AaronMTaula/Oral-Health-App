const test = require('node:test');
const { after, before } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { spawn } = require('node:child_process');

const BASE_URL = 'http://localhost:5000';
let backendProcess;

async function fetchJson(path, opts = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });

  const text = await res.text();
  return {
    status: res.status,
    ok: res.ok,
    headers: res.headers,
    text,
    json: (() => { try { return JSON.parse(text); } catch { return null; } })(),
  };
}

async function waitForServer() {
  for (let i = 0; i < 30; i += 1) {
    try {
      const res = await fetch(`${BASE_URL}/api/health`);
      if (res.ok) return;
    } catch {
      // server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error('Backend did not become ready in time');
}

before(async () => {
  backendProcess = spawn(process.execPath, ['app.js'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'ignore',
  });
  await waitForServer();
});

after(() => {
  if (backendProcess && !backendProcess.killed) backendProcess.kill();
});

test('backend health endpoint is available', async () => {
  await waitForServer();
  const res = await fetchJson('/api/health');
  assert.equal(res.status, 200);
  assert.match(res.text, /running/i);
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(res.headers.get('x-frame-options'), 'DENY');
  assert.equal(res.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');

  const hsts = res.headers.get('strict-transport-security');
  assert.match(hsts || '', /max-age=\d+/);
  if (process.env.NODE_ENV === 'production') {
    assert.match(hsts, /max-age=31536000/);
  } else {
    assert.match(hsts, /max-age=0/);
  }

  const csp = res.headers.get('content-security-policy') || '';
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /connect-src[^;]*https:\/\/identitytoolkit\.googleapis\.com/);
  assert.match(csp, /connect-src[^;]*https:\/\/securetoken\.googleapis\.com/);
  assert.match(csp, /connect-src[^;]*https:\/\/\*\.onrender\.com/);
  assert.match(csp, /frame-src[^;]*https:\/\/\*\.firebaseapp\.com/);
});

test('legacy auth endpoints are explicitly disabled', async () => {
  await waitForServer();

  const endpoints = ['/api/auth/login', '/api/auth/register', '/api/auth/createUser'];

  for (const endpoint of endpoints) {
    const res = await fetchJson(endpoint, {
      method: 'POST',
      body: JSON.stringify({}),
    });

    assert.equal(res.status, 410, `${endpoint} should be disabled`);
    assert.match((res.json?.error || res.text), /no longer supported|use Firebase/i);
  }
});

test('protected routes reject unauthorized access', async () => {
  await waitForServer();

  const res = await fetchJson('/api/users/me');
  assert.equal(res.status, 401);
  assert.match((res.json?.error || res.text), /authorization denied|token/i);
});

test('invalid Firebase auth responses are rejected', async () => {
  await waitForServer();

  const res = await fetchJson('/api/auth/login-firebase', {
    method: 'POST',
    body: JSON.stringify({ idToken: 'invalid-token' }),
  });

  assert.equal(res.status, 401);
  assert.match((res.json?.error || res.text), /invalid firebase token/i);
});

test('repeated bad auth attempts hit rate limiting', async () => {
  await waitForServer();

  let hit429 = false;

  for (let i = 0; i < 12; i += 1) {
    const res = await fetchJson('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ idToken: 'bad-token' }),
    });

    if (res.status === 429) {
      hit429 = true;
      break;
    }
  }

  assert.equal(hit429, true, 'Expected rate limit to trigger after repeated failed attempts');
});

test('oversized JSON bodies are rejected', async () => {
  await waitForServer();

  const res = await fetchJson('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ idToken: 'x'.repeat(110 * 1024) }),
  });

  assert.equal(res.status, 413);
});

test('unapproved origins do not receive CORS permission', async () => {
  await waitForServer();

  const res = await fetch(`${BASE_URL}/api/health`, {
    headers: { Origin: 'https://unapproved.example' },
  });

  assert.equal(res.status, 200);
  assert.equal(res.headers.get('access-control-allow-origin'), null);
});

test('frontend no longer references dead legacy login routes', async () => {
  const fs = require('node:fs');
  const path = require('node:path');

  const frontendRoot = path.join(__dirname, '..', '..', 'frontend', 'src');
  const files = [
    path.join(frontendRoot, 'services', 'authService.js'),
    path.join(frontendRoot, 'components', 'LoginForm.jsx'),
    path.join(frontendRoot, 'components', 'SignupForm.jsx'),
  ];

  const content = files.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
  const legacyRoutePattern = /['\"]\s*:\s*['\"]\s*http:\/\/localhost:5000\/api\/auth\/(login|register|createUser)(?:['\"/?]|$)|['\"]\s*\/api\/auth\/(login|register|createUser)(?:['\"/?]|$)/i;
  assert.equal(legacyRoutePattern.test(content), false, 'Frontend should not call dead legacy auth routes');
});

test('Firebase synchronization is keyed by immutable Firebase UID', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const authRoutes = fs.readFileSync(path.join(__dirname, '..', 'routes', 'authRoutes.js'), 'utf8');

  assert.match(authRoutes, /User\.findOne\(\{ firebaseUid: uid \}\)/);
  assert.doesNotMatch(authRoutes, /User\.findOne\(\{\s*\$or:\s*\[\{ email/);
});

test('user ownership checks are based on Firebase UID, not mutable email', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const userController = fs.readFileSync(path.join(__dirname, '..', 'controllers', 'userController.js'), 'utf8');

  assert.match(userController, /firebaseUid\s*!==\s*req\.user\.uid|firebaseUid\s*!==\s*req\.user\.uid/i);
  assert.doesNotMatch(userController, /targetUser\.email\s*!==\s*req\.user\.email|targetUser\.email\s*!==\s*req\.user\.email/i);
});
