const express = require('express');
const router = express.Router();

// Import route modules
const chatRoutes = require('./chat');
const chatbotRoutes = require('./chatbot');

// Use route modules
router.use('/chat', chatRoutes);
router.use('/chatbot', chatbotRoutes);

module.exports = router; 