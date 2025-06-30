const mongoose = require('mongoose');

const complianceLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  action: { type: String, required: true },
  deviceInfo: String,
  result: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ComplianceLog', complianceLogSchema); 