const mongoose = require('mongoose');

const locationLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number
  },
  timestamp: { type: Date, default: Date.now },
  action: String
});

module.exports = mongoose.model('LocationLog', locationLogSchema); 