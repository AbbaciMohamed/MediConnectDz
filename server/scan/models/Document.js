const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  imageUrl: String, // URL or path to stored image
  extractedText: {
    type: String,
    required: true
  },
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  scanType: {
    type: String,
    enum: ['document', 'receipt', 'business_card', 'other'],
    default: 'document'
  },
  confidence: Number, // OCR confidence score
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field on save
DocumentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Document', DocumentSchema);
