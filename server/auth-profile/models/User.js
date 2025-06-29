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
  certificate: { type: String, default: null }
});

module.exports = mongoose.model('User', userSchema); 