const Appointment = require('../../auth-profile/models/Appointment');
const Medicine = require('../models/Medicine');
const InventoryLog = require('../models/InventoryLog');
const mongoose = require('mongoose');

// Appointments per day/week/month by doctor
exports.appointmentsByDoctor = async (req, res) => {
  try {
    const { doctorId, period } = req.query; // period: day/week/month
    if (!doctorId) return res.status(400).json({ message: 'doctorId required' });
    let groupFormat;
    if (period === 'week') groupFormat = { $dateToString: { format: '%Y-%U', date: '$date' } };
    else if (period === 'month') groupFormat = { $dateToString: { format: '%Y-%m', date: '$date' } };
    else groupFormat = { $dateToString: { format: '%Y-%m-%d', date: '$date' } };
    const stats = await Appointment.aggregate([
      { $match: { doctorId } },
      { $group: { _id: groupFormat, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching analytics', error: err.message });
  }
};

// Appointments per day/week/month by clinic
exports.appointmentsByClinic = async (req, res) => {
  try {
    const { clinicId, period } = req.query;
    if (!clinicId) return res.status(400).json({ message: 'clinicId required' });
    let groupFormat;
    if (period === 'week') groupFormat = { $dateToString: { format: '%Y-%U', date: '$date' } };
    else if (period === 'month') groupFormat = { $dateToString: { format: '%Y-%m', date: '$date' } };
    else groupFormat = { $dateToString: { format: '%Y-%m-%d', date: '$date' } };
    const stats = await Appointment.aggregate([
      { $match: { clinicId } },
      { $group: { _id: groupFormat, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching analytics', error: err.message });
  }
};

// Appointment status breakdown
exports.appointmentStatus = async (req, res) => {
  try {
    const { doctorId, clinicId } = req.query;
    const match = {};
    if (doctorId) match.doctorId = doctorId;
    if (clinicId) match.clinicId = clinicId;
    const stats = await Appointment.aggregate([
      { $match: match },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching status breakdown', error: err.message });
  }
};

// Inventory consumption trends
exports.inventoryConsumption = async (req, res) => {
  try {
    const { pharmacyId, medicineId, period } = req.query;
    let match = { action: 'consumed' };
    if (pharmacyId) match.pharmacyId = pharmacyId;
    if (medicineId) match.medicineId = new mongoose.Types.ObjectId(medicineId);
    let groupFormat;
    if (period === 'week') groupFormat = { $dateToString: { format: '%Y-%U', date: '$date' } };
    else if (period === 'month') groupFormat = { $dateToString: { format: '%Y-%m', date: '$date' } };
    else groupFormat = { $dateToString: { format: '%Y-%m-%d', date: '$date' } };
    const stats = await InventoryLog.aggregate([
      { $match: match },
      { $group: { _id: groupFormat, total: { $sum: '$quantity' } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inventory analytics', error: err.message });
  }
};

// Low-stock alerts
exports.lowStock = async (req, res) => {
  try {
    const { threshold, pharmacyId } = req.query;
    const query = { stock: { $lte: Number(threshold || 10) } };
    if (pharmacyId) query.pharmacyId = pharmacyId;
    const meds = await Medicine.find(query);
    res.json(meds);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching low stock', error: err.message });
  }
}; 