const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointmentId: { type: String, unique: true, required: true },
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  clinicId: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  notes: String
});

module.exports = mongoose.model('Appointment', appointmentSchema); 