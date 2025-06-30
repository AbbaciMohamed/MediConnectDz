const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, default: 0 },
  pharmacyId: { type: String, required: true },
  sponsored: { type: Boolean, default: false },
  sponsoredStart: { type: Date, default: null },
  sponsoredEnd: { type: Date, default: null },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'expired'], default: 'pending' },
  priority: { type: Number, default: 0 }
});

module.exports = mongoose.model('Medicine', medicineSchema); 