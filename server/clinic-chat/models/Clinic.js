const mongoose = require('mongoose');

// Clinic model for search/profile/dashboard
const clinicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  specialties: [String],
  services: [String],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  location: String,
  administratorName: String,
  phone: String,
  licenseNumber: String,
  acceptedInsurance: [String],
  operatingHours: Object,
  isVerified: { type: Boolean, default: false },
  trialEndsAt: Date
});

module.exports = mongoose.model('Clinic', clinicSchema); 