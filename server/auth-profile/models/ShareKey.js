const mongoose = require('mongoose');

const shareKeySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  patientId: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  doctorId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ShareKey', shareKeySchema); 