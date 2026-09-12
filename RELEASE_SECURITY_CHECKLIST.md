# Public Release Security Checklist

Status: **NO-GO until every requirement below is checked.**

Complete the items in order. Each item is complete only when all of its requirements and evidence are satisfied.

## 1. Production API and frontend deployment

- [x] Choose and document one production hosting path for the frontend and backend: Render Static Site at `https://oral-health-app-frontend.onrender.com` for the frontend and Render Web Service at `https://oral-health-app.onrender.com` for the backend, as recorded in `README.md` and `render.yaml`.
- [x] In the Render frontend service `oral-health-app-frontend`, rename the existing `VITE_API_URI` variable to `VITE_API_URL` and set its value to `https://oral-health-app.onrender.com`; leave the Google Maps variables unchanged. Save and redeploy using the current repository commit.
- [x] Verify the production frontend does not send API requests to `localhost`, `127.0.0.1`, or a Vite development proxy. The deployed bundle uses `https://oral-health-app.onrender.com`; its one remaining `localhost` string is React Router's internal URL fallback, not an API endpoint.
- [x] Verify the deployed frontend can successfully call `/api/health` and an authenticated API route from the real public origin. The backend health request and public Firebase sign-in (`/api/auth/login-firebase`) and logout (`/api/auth/logout`) are verified with 200 OK responses.
- [x] Set `FRONTEND_ORIGINS=https://oral-health-app-frontend.onrender.com` in the Render backend service `oral-health-app`, save, and redeploy. The live backend returns `Access-Control-Allow-Origin: https://oral-health-app-frontend.onrender.com` and does not grant the unapproved-origin probe.
- [x] Verify the deployment does not expose a broken `/api` route through GitHub Pages or another static host. The Render frontend host returns its HTML application for `/api/health`, not a backend JSON response; API traffic must go to `https://oral-health-app.onrender.com`.
- [x] Record the final frontend URL, backend URL, and deployment settings in `README.md` and `render.yaml`.

## 2. HTTPS and transport security

- [x] Serve the public backend only through HTTPS with a valid certificate. The HTTPS health endpoint responds successfully.
- [x] Configure the hosting proxy or load balancer to redirect HTTP to HTTPS, or reject public HTTP traffic. Render redirects the HTTP backend URL to HTTPS.
- [ ] If TLS terminates at a reverse proxy, configure Express proxy handling correctly and verify HTTPS redirect logic cannot be bypassed through spoofed headers.
- [ ] Verify cookies, if introduced later, use `Secure`, `HttpOnly`, and an appropriate `SameSite` policy.
- [ ] Verify no production configuration, API URL, documentation, or browser network request uses plain HTTP except local development.
- [x] Confirm security headers are supplied by the application, including `Strict-Transport-Security`, `X-Content-Type-Options`, `Content-Security-Policy`, `X-Frame-Options`, and `Referrer-Policy`. Helmet is configured in `backend/app.js`; local development sends HSTS with `max-age=0`, while production sends one-year HSTS.

## 3. JWT validation and revocation

- [x] Define the JWT contract: issuer, audience, algorithm, maximum lifetime, required subject or UID claim, and required token version claim.
- [x] Configure signing and verification to allow only the selected algorithm; do not rely on library defaults.
- [x] Verify tokens reject missing, malformed, expired, wrong-issuer, wrong-audience, wrong-algorithm, and missing-claim cases.
- [x] Bind the authenticated request identity to the immutable Firebase UID, not to a mutable email address or user-supplied identifier.
- [x] Verify logout increments the server-side token version and that the previously issued token is rejected afterward.
- [x] Confirm JWT secrets are long, randomly generated, stored only in the deployment secret manager, and never returned in responses or logs.
- [x] Add automated tests for all rejected-token and revoked-token cases.

## 4. Firebase authentication

- [x] Verify every backend Firebase token is checked with the Firebase Admin SDK for the intended project and tenant.
- [x] Verify the backend creates or links a MongoDB user only after Firebase verification succeeds.
- [x] Prevent account-linking by email from attaching a Firebase UID to the wrong existing account.
- [x] Verify Firebase errors return generic client messages and do not expose credentials, token contents, stack traces, or database details.
- [x] Add automated tests for invalid, revoked, disabled, and cross-account Firebase authentication cases.

## 5. IDOR and authorization

- [x] Enforce ownership using the authenticated Firebase UID on every user-owned read, update, delete, and future resource endpoint.
- [x] Do not authorize access by comparing mutable email fields.
- [x] Reject requests that attempt to update immutable identity fields such as Firebase UID or account ownership.
- [x] Return consistent `401` responses for unauthenticated requests and `403` responses for authenticated requests without ownership.
- [x] Add automated two-user tests covering profile reads, updates, deletes, and every user-owned resource.

## 6. MongoDB production access

- [x] Use a dedicated least-privilege MongoDB application user with `readWrite` role on `oral-health-app`.
- [x] Require TLS for the MongoDB connection and verify the production URI does not disable certificate validation.
- [x] Confirm unique indexes and required validation exist for email and Firebase UID, and test duplicate/linking conflicts safely.
- [x] Verify database errors are logged securely and generic errors are returned to clients.

## 7. Request abuse and application hardening

- [x] Keep the JSON and URL-encoded body limits intentionally small for each route (`100kb`).
- [x] Apply rate limits to Firebase login, signup, password recovery, logout, and other expensive or security-sensitive endpoints.
- [x] Verify error responses do not reveal stack traces, secrets, tokens, MongoDB details, or Firebase details.

## 8. Release verification

- [x] Run the complete backend test suite with `npm test` from `backend/`; all 10 tests pass.
- [x] Run the frontend production check with `npm run build` from `frontend/`; TypeScript and Vite build both pass.
- [x] Add and pass tests for the JWT, Firebase revocation, IDOR, production CORS, HTTPS/proxy, and MongoDB requirements above.
- [x] Scan Git-tracked files and Git history for `.env` files, private keys, service-account files, credentials, tokens, and accidental secret values.
- [x] Confirm generated `dist/` output contains no backend secrets, private keys, internal database URLs, or unintended development endpoints.
- [ ] Review the final dependency audit and resolve or explicitly accept all high and critical vulnerabilities.
- [ ] Have a second reviewer verify this checklist and the release evidence.

## 9. Final gate: rotate credentials immediately before public release

Do this only after all previous requirements are complete and the deployment configuration is ready to receive new values.

- [ ] Rotate the production MongoDB password or application user credentials.
- [ ] Rotate the production JWT signing secret; invalidate all existing backend JWTs.
- [ ] Rotate Firebase Admin service-account credentials or replace the service account if any credential may have existed in repository history.
- [ ] Rotate any other API keys, tokens, hosting secrets, or deployment credentials found during the final scan.
- [ ] Update only the production secret manager or deployment environment with the new values; do not commit them or place them in frontend source.
- [ ] Redeploy and verify health, Firebase sign-in, protected API access, logout revocation, and database access with the new credentials.
- [ ] Verify old credentials and all previously issued JWTs no longer work.
- [ ] Run the final Git-tracked secret scan again and confirm it is clean.
- [ ] Record rotation time, affected services, verification results, and the next rotation owner/date without recording secret values.
- [ ] Mark the release **GO** only after this final item is complete.
