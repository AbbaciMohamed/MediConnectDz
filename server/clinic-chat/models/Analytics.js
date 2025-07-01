const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  type: { type: String, enum: ['heatmap', 'visit_count', 'retention', 'forecast'], required: true },
  date: { type: Date, default: Date.now },
  data: { type: Object, default: {} }
});

module.exports = mongoose.model('Analytics', analyticsSchema); 