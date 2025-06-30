const mongoose = require('mongoose');

const sponsoredClinicSchema = new mongoose.Schema({
  clinicId: { type: String, required: true },
  featured: { type: Boolean, default: false },
  start: { type: Date, default: null },
  end: { type: Date, default: null },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'expired'], default: 'pending' },
  priority: { type: Number, default: 0 }
});

module.exports = mongoose.model('SponsoredClinic', sponsoredClinicSchema); 