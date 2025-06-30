const mongoose = require('mongoose');

const inventoryLogSchema = new mongoose.Schema({
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  pharmacyId: { type: String, required: true },
  action: { type: String, enum: ['consumed', 'restocked'], required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InventoryLog', inventoryLogSchema); 