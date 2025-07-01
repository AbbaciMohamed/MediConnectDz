const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {
  chatbotMessage,
  getStatus,
  History,
  deleteHistory,
  sendMessage


} = require  ('../controllers/chatbotController')
const { validateRequest } = require('../../shared/middleware/validation');

// ✅ POST /api/clinic/chatbot/message (basic message, public)
router.post('/message', [
  body('message').notEmpty().trim().isLength({ min: 1, max: 1000 }),
  validateRequest
], sendMessage);

// ✅ POST /api/clinic/chatbot/smart-message (LLM-based intent classifier)
router.post('/smart-message', chatbotMessage);

// ✅ GET /api/clinic/chatbot/status (public)
router.get('/status',getStatus);


// ✅ GET /api/clinic/chatbot/history (auth required)
router.get('/gethistory', History);

// ✅ DELETE /api/clinic/chatbot/history (auth required)
router.delete('delete/history',deleteHistory);

module.exports = router;
