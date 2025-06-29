const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');

// Create or get a chat room between two users
exports.getOrCreateRoom = async (req, res) => {
  try {
    const { userId1, userId2, type } = req.body;
    if (!userId1 || !userId2 || !type) return res.status(400).json({ message: 'Missing parameters' });
    let room = await ChatRoom.findOne({
      participants: { $all: [userId1, userId2] },
      type
    });
    if (!room) {
      room = new ChatRoom({ participants: [userId1, userId2], type });
      await room.save();
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: 'Error getting/creating room', error: err.message });
  }
};

// Send a message in a chat room
exports.sendMessage = async (req, res) => {
  try {
    const { roomId, senderId, content } = req.body;
    if (!roomId || !senderId || !content) return res.status(400).json({ message: 'Missing parameters' });
    const message = new Message({ roomId, senderId, content });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Error sending message', error: err.message });
  }
};

// Get all messages for a chat room
exports.getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages', error: err.message });
  }
}; 