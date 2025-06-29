const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Create or get a chat room
router.post('/room', chatController.getOrCreateRoom);
// Send a message
router.post('/message', chatController.sendMessage);
// Get all messages for a room
router.get('/messages/:roomId', chatController.getMessages);

module.exports = router; 