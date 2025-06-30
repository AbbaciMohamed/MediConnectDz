const mongoose = require('mongoose');
const logSchema = new mongoose.Schema({
  message: String,
  level: { type: String, default: 'info' },
  timestamp: { type: Date, default: Date.now },
  meta: mongoose.Schema.Types.Mixed
});
module.exports = mongoose.model('Log', logSchema); 