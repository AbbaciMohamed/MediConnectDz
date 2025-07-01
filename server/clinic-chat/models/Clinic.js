const mongoose = require('mongoose');

// Define Clinic schema
const clinicSchema = new mongoose.Schema({
  clinicId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  phone: { type: String },
  geoLocation: {
    lat: { type: Number },
    lng: { type: Number }
  },
  specialization: [{ type: String }],  // alias; use either this or specialties
  specialties: [{ type: String }],
  services: [{ type: String }],
  ownerUserId: { type: String },
  staff: [{ type: String }],
  activePlan: {
    type: String,
    enum: ['Basic', 'Pro', 'Enterprise'],
    default: 'Basic'
  },
  isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  location: { type: String }, // often used in search
  administratorName: { type: String },
  licenseNumber: { type: String },
  acceptedInsurance: [{ type: String }],
  operatingHours: { type: mongoose.Schema.Types.Mixed }, // flexible object
  isVerified: { type: Boolean, default: false },
  trialEndsAt: { type: Date },
  mapCoordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
      required: true
    }
  }
});

// Add geospatial index for location-based queries
clinicSchema.index({ mapCoordinates: '2dsphere' });

module.exports = mongoose.model('Clinic', clinicSchema);
