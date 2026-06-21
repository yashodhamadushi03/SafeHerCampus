const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Register a new user
router.post('/register', authController.register);

// Login a user
router.post('/login', authController.login);

// Get current user profile (protected)
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
