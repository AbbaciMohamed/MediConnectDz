const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const chatbotController = require('../controllers/chatbotController');
const { validateRequest } = require('../../shared/middleware/validation');
const { authenticateToken } = require('../../shared/middleware/auth');

// Send message to chatbot (public endpoint - no authentication required)
router.post('/message', [
  body('message').notEmpty().trim().isLength({ min: 1, max: 1000 }),
  validateRequest
], chatbotController.sendMessage);

// Get chatbot status (public endpoint)
router.get('/status', chatbotController.getStatus);

// Get conversation history (authenticated)
router.get('/history', authenticateToken, chatbotController.getHistory);

// Clear conversation history (authenticated)
router.delete('/history', authenticateToken, chatbotController.clearHistory);

module.exports = router; 