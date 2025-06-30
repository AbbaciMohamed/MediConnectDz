const express = require('express');
const Clinic = require('../models/Clinic');
const router = express.Router();

// GET /api/clinics/:id - get full clinic profile
router.get('/:id', async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching clinic', error: err.message });
  }
});

// GET /api/clinics/:id/dashboard - get dashboard stats for a clinic
router.get('/:id/dashboard', async (req, res) => {
  try {
    // Example: return mock stats, replace with real aggregation as needed
    const stats = {
      appointments: Math.floor(Math.random() * 100),
      patients: Math.floor(Math.random() * 500),
      revenue: Math.floor(Math.random() * 10000),
      rating: 4.7,
      reviews: 123
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: err.message });
  }
});

module.exports = router; 