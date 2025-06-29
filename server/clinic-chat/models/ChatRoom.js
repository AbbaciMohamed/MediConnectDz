const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  participants: [{ type: String, required: true }], // userIds
  type: { type: String, enum: ['patient-doctor', 'patient-hospital'], required: true }
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema); 