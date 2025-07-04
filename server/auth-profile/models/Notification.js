const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true }, // e.g. booking, subscription, etc.
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  meta: { type: Object, default: {} }
});
module.exports = mongoose.model('Notification', notificationSchema); 