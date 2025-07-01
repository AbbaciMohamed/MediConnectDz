const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Safe encryption fallback
let encryptField = (val) => val;
let decryptField = (val) => val;

try {
  const utils = require('../../shared/utils/encryption');
  encryptField = utils.encryptField || encryptField;
  decryptField = utils.decryptField || decryptField;
} catch (err) {
  console.warn('⚠️ Encryption utils not found. Continuing without encryption.');
}

const notificationSchema = new mongoose.Schema({
  message: String,
  read: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
}, { _id: false });

const scheduleSchema = new mongoose.Schema({
  day: String,
  startHour: String,
  endHour: String
}, { _id: false });

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
    default: () => uuidv4()
  },
  name: { type: String },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'nurse', 'admin', 'clinic', 'supplier'],
    required: true
  },
  clinicId: { type: String, default: null },

  // Subscription / Plan Info
  planType: { type: String, enum: ['Basic', 'Pro', 'Enterprise'], default: 'Basic' },
  planActivatedAt: { type: Date, default: null },
  planExpiresAt: { type: Date, default: null },

  // Profile Info
  profile: {
    age: Number,
    gender: String,
    phone: String,
    address: String,
    healthInfo: String,       // Encrypted
    medicalHistory: String    // Encrypted
  },

  // For doctors or clinics
  certificate: { type: String, default: null },

  // Subscription
  subscriptionPlan: { type: String, enum: ['Basic', 'Pro', 'Enterprise'], default: 'Basic' },
  subscriptionStart: { type: Date, default: null },
  subscriptionEnd: { type: Date, default: null },
  subscriptionActive: { type: Boolean, default: false },
  premiumFeatures: { type: Boolean, default: false },
  schedule: [scheduleSchema],
  notifications: [notificationSchema]
});

module.exports = mongoose.model('User', userSchema);

  
  