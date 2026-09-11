// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const admin = require('../utils/firebase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const {
  ALGORITHM,
  ISSUER,
  AUDIENCE,
  EXPIRES_IN,
} = require('../config/jwtConfig');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts. Please try again later.' },
});

const buildJwt = (uid, email, tokenVersion) =>
  jwt.sign({ uid, email, tokenVersion }, JWT_SECRET, {
    algorithm: ALGORITHM,
    issuer: ISSUER,
    audience: AUDIENCE,
    expiresIn: EXPIRES_IN,
  });

const syncFirebaseUser = async (decoded) => {
  const uid = decoded?.uid;
  const email = decoded?.email || `${uid}@firebase.local`;
  const name = decoded?.name || 'New User';

  if (!uid) {
    throw new Error('Missing Firebase uid');
  }

  let user = await User.findOne({ firebaseUid: uid });

  if (!user) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.firebaseUid && existingUser.firebaseUid !== uid) {
        const error = new Error('Firebase email is already linked to another account');
        error.code = 'FIREBASE_EMAIL_CONFLICT';
        throw error;
      }
      existingUser.firebaseUid = uid;
      existingUser.name = existingUser.name || name;
      if (!existingUser.password) {
        const randomPassword = crypto.randomBytes(32).toString('hex');
        existingUser.password = await bcrypt.hash(randomPassword, 10);
      }
      try {
        await existingUser.save();
      } catch (err) {
        if (err?.code !== 11000) throw err;
        user = await User.findOne({ firebaseUid: uid });
        if (!user) throw err;
        return user;
      }
      return existingUser;
    }

    const randomPassword = crypto.randomBytes(32).toString('hex');
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      firebaseUid: uid,
    });

    try {
      await user.save();
    } catch (err) {
      if (err?.code !== 11000) throw err;
      user = await User.findOne({ firebaseUid: uid });
      if (!user) throw err;
    }
    return user;
  }

  if (!user.password) {
    const randomPassword = crypto.randomBytes(32).toString('hex');
    user.password = await bcrypt.hash(randomPassword, 10);
  }
  if (!user.name && name) user.name = name;
  if (!user.email && email) user.email = email;
  await user.save();

  return user;
};

router.post('/login', (_req, res) => {
  return res.status(410).json({
    error: 'Legacy login is no longer supported. Please use Firebase authentication.',
  });
});

router.post('/register', (_req, res) => {
  return res.status(410).json({
    error: 'Legacy registration is no longer supported. Please use Firebase authentication.',
  });
});

router.post('/createUser', (_req, res) => {
  return res.status(410).json({
    error: 'Legacy signup is no longer supported. Please use Firebase authentication.',
  });
});

router.post('/login-firebase', authLimiter, async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) return res.status(400).json({ error: 'No Firebase ID token provided' });

  let stage = 'firebase-token-verification';
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    stage = 'mongo-user-sync';
    const user = await syncFirebaseUser(decoded);
    const token = buildJwt(user.firebaseUid, user.email, user.tokenVersion);

    res.json({
      token,
      user: { id: user._id, uid: decoded.uid, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Firebase login failed:', {
      stage,
      code: err.code || 'unknown',
      codeName: err.codeName || 'unknown',
      name: err.name || 'Error',
      message: err.message || 'No error message',
    });
    const status = stage === 'firebase-token-verification'
      ? 401
      : err.code === 'FIREBASE_EMAIL_CONFLICT'
        ? 409
        : 500;
    res.status(status).json({
      error: stage === 'firebase-token-verification'
        ? 'Invalid Firebase token'
        : err.code === 'FIREBASE_EMAIL_CONFLICT'
          ? 'Firebase account cannot be linked to this email'
          : 'Authentication service unavailable',
    });
  }
});

router.post('/logout', authMiddleware, async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      { $inc: { tokenVersion: 1 } }
    );
    res.json({ message: 'Logged out' });
  } catch (err) {
    console.error('Logout failed:', err);
    res.status(500).json({ error: 'Logout failed' });
  }
});

router.post('/signup', authLimiter, async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) return res.status(400).json({ error: 'No Firebase ID token provided' });

  let stage = 'firebase-token-verification';
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    stage = 'mongo-user-sync';
    const user = await syncFirebaseUser(decoded);
    const token = buildJwt(user.firebaseUid, user.email, user.tokenVersion);

    res.status(201).json({
      message: 'User created',
      token,
      user: { id: user._id, uid: decoded.uid, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Firebase signup failed:', {
      stage,
      code: err.code || 'unknown',
      codeName: err.codeName || 'unknown',
      name: err.name || 'Error',
      message: err.message || 'No error message',
    });
    const status = stage === 'firebase-token-verification'
      ? 401
      : err.code === 'FIREBASE_EMAIL_CONFLICT'
        ? 409
        : 500;
    res.status(status).json({
      error: stage === 'firebase-token-verification'
        ? 'Invalid Firebase token'
        : err.code === 'FIREBASE_EMAIL_CONFLICT'
          ? 'Firebase account cannot be linked to this email'
          : 'Authentication service unavailable',
    });
  }
});

module.exports = router;
