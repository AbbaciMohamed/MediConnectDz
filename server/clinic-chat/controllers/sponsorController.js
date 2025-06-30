const SponsoredClinic = require('../models/SponsoredClinic');
const Medicine = require('../models/Medicine');
const mongoose = require('mongoose');

// Clinic requests/updates sponsorship
exports.requestClinicSponsorship = async (req, res) => {
  try {
    const { clinicId, start, end, priority } = req.body;
    if (req.user.role !== 'clinic' || req.user.userId !== clinicId) return res.status(403).json({ message: 'Only clinics can request sponsorship' });
    let sponsor = await SponsoredClinic.findOne({ clinicId });
    if (!sponsor) sponsor = new SponsoredClinic({ clinicId });
    sponsor.featured = false;
    sponsor.start = start;
    sponsor.end = end;
    sponsor.paymentStatus = 'pending';
    sponsor.priority = priority || 0;
    await sponsor.save();
    res.json(sponsor);
  } catch (err) {
    res.status(500).json({ message: 'Error requesting sponsorship', error: err.message });
  }
};

// Admin activates/deactivates clinic sponsorship
exports.adminSetClinicSponsorship = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const { featured, paymentStatus, priority } = req.body;
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
    let sponsor = await SponsoredClinic.findOne({ clinicId });
    if (!sponsor) return res.status(404).json({ message: 'Not found' });
    if (featured !== undefined) sponsor.featured = featured;
    if (paymentStatus) sponsor.paymentStatus = paymentStatus;
    if (priority !== undefined) sponsor.priority = priority;
    await sponsor.save();
    res.json(sponsor);
  } catch (err) {
    res.status(500).json({ message: 'Error updating sponsorship', error: err.message });
  }
};

// Pharmacy requests/updates medicine sponsorship
exports.requestMedicineSponsorship = async (req, res) => {
  try {
    const { medicineId, start, end, priority } = req.body;
    const med = await Medicine.findById(medicineId);
    if (!med) return res.status(404).json({ message: 'Medicine not found' });
    if (req.user.role !== 'pharmacy' || req.user.userId !== med.pharmacyId) return res.status(403).json({ message: 'Only pharmacy owner can sponsor' });
    med.sponsored = false;
    med.sponsoredStart = start;
    med.sponsoredEnd = end;
    med.paymentStatus = 'pending';
    med.priority = priority || 0;
    await med.save();
    res.json(med);
  } catch (err) {
    res.status(500).json({ message: 'Error requesting sponsorship', error: err.message });
  }
};

// Admin activates/deactivates medicine sponsorship
exports.adminSetMedicineSponsorship = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const { sponsored, paymentStatus, priority } = req.body;
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
    const med = await Medicine.findById(medicineId);
    if (!med) return res.status(404).json({ message: 'Medicine not found' });
    if (sponsored !== undefined) med.sponsored = sponsored;
    if (paymentStatus) med.paymentStatus = paymentStatus;
    if (priority !== undefined) med.priority = priority;
    await med.save();
    res.json(med);
  } catch (err) {
    res.status(500).json({ message: 'Error updating sponsorship', error: err.message });
  }
};

// Search clinics (featured first)
exports.searchClinics = async (req, res) => {
  try {
    const clinics = await SponsoredClinic.find({ featured: true, paymentStatus: 'paid', end: { $gte: new Date() } }).sort({ priority: -1 });
    // TODO: join with actual clinic info if needed
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ message: 'Error searching clinics', error: err.message });
  }
};

// Search medicines (sponsored first)
exports.searchMedicines = async (req, res) => {
  try {
    const meds = await Medicine.find().sort({ sponsored: -1, priority: -1 });
    res.json(meds);
  } catch (err) {
    res.status(500).json({ message: 'Error searching medicines', error: err.message });
  }
}; 