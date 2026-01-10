// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const admin = require('../utils/firebase'); // firebase-admin instance
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// POST /api/auth/login-firebase
router.post('/login-firebase', async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) return res.status(400).json({ error: 'No Firebase ID token provided' });

  try {
    // Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(idToken);

    // Generate backend JWT
    const backendToken = jwt.sign(
      { uid: decoded.uid, email: decoded.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token: backendToken, user: { uid: decoded.uid, email: decoded.email } });
  } catch (err) {
    console.error('Firebase login failed:', err);
    res.status(401).json({ error: 'Invalid Firebase token' });
  }
});

module.exports = router;
