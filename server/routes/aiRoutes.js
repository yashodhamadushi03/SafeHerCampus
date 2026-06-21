const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');

// Post message to AI assistant (protected)
router.post('/chat', authMiddleware, aiController.chat);

module.exports = router;
