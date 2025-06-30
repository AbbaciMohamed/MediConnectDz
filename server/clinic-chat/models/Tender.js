const mongoose = require('mongoose');

// Marketplace Tender model for healthcare platform
const tenderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  requirements: [String],
  budget: Number,
  deadline: Date,
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  applicants: [{ type: String }], // supplier IDs or emails
  createdAt: { type: Date, default: Date.now },
  clinicName: String,
  urgency: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  estimatedValue: Number,
  location: String,
  contactPerson: String,
  submissionDeadline: Date,
  evaluationCriteria: [String]
});

module.exports = mongoose.model('Tender', tenderSchema); 