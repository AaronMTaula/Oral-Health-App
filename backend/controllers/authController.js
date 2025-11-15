// backend/controllers/authController.js
const admin = require('../utils/firebase');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.loginFirebase = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) return res.status(400).json({ error: 'No ID token provided' });

  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    // Find or create user in MongoDB
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name: 'New User', password: 'firebaseuser' });
      await user.save();
    }

    // Issue backend JWT
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid Firebase ID token' });
  }
};
