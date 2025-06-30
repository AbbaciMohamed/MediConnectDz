const mongoose = require('mongoose');
const { encryptField, decryptField } = require('../../shared/utils/encryption');

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['patient', 'doctor', 'nurse', 'admin', 'clinic', 'supplier'] },
  clinicId: { type: String, default: null },
  planType: { type: String, enum: ['Basic', 'Pro', 'Enterprise'], default: 'Basic' },
  planActivatedAt: { type: Date, default: null },
  planExpiresAt: { type: Date, default: null },
  profile: {
    age: Number,
    gender: String,
    phone: String,
    address: String,
    healthInfo: String, // will be encrypted
    medicalHistory: String // will be encrypted
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

// Encrypt healthInfo and medicalHistory before save
userSchema.pre('save', function(next) {
  if (this.profile) {
    if (this.profile.healthInfo && !this.profile.healthInfo.startsWith('enc:')) {
      this.profile.healthInfo = 'enc:' + encryptField(this.profile.healthInfo);
    }
    if (this.profile.medicalHistory && !this.profile.medicalHistory.startsWith('enc:')) {
      this.profile.medicalHistory = 'enc:' + encryptField(this.profile.medicalHistory);
    }
  }
  next();
});

// Decrypt after find
userSchema.post('init', function(doc) {
  if (doc.profile) {
    if (doc.profile.healthInfo && doc.profile.healthInfo.startsWith('enc:')) {
      doc.profile.healthInfo = decryptField(doc.profile.healthInfo.slice(4));
    }
    if (doc.profile.medicalHistory && doc.profile.medicalHistory.startsWith('enc:')) {
      doc.profile.medicalHistory = decryptField(doc.profile.medicalHistory.slice(4));
    }
  }
});

module.exports = mongoose.model('User', userSchema); 