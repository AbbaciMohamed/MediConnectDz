const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['patient', 'doctor', 'nurse', 'admin'] },
  clinicId: { type: String, default: null },
  profile: {
    age: Number,
    gender: String,
    phone: String,
    address: String,
    healthInfo: String
  },
  certificate: { type: String, default: null },
  subscriptionPlan: { type: String, default: null }, // e.g., 'basic', 'premium' (required for clinics)
  subscriptionStart: { type: Date, default: null },
  subscriptionEnd: { type: Date, default: null },
  subscriptionActive: { type: Boolean, default: false },
  premiumFeatures: { type: Boolean, default: false }, // for doctors
  schedule: [
    {
      day: String, // e.g., 'Monday'
      startHour: String, // e.g., '09:00'
      endHour: String // e.g., '17:00'
    }
  ],
  notifications: [
    {
      message: String,
      date: { type: Date, default: Date.now },
      read: { type: Boolean, default: false }
    }
  ]
});

module.exports = mongoose.model('User', userSchema); 