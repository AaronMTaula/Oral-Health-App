// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Firebase login route
router.post('/login-firebase', authController.loginFirebase);

module.exports = router;
