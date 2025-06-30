const express = require('express');
const Clinic = require('../models/Clinic');
const router = express.Router();

// GET /api/clinics - list/search/filter clinics
router.get('/', async (req, res) => {
  try {
    const { search, specialty, location, rating, lat, lng } = req.query;
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { specialties: { $regex: search, $options: 'i' } }
      ];
    }
    if (specialty && specialty !== 'all') query.specialties = specialty;
    if (location && location !== 'all') query.location = location;
    if (rating) query.rating = { $gte: Number(rating) };
    let clinics;
    if (lat && lng) {
      clinics = await Clinic.find({
        ...query,
        mapCoordinates: {
          $near: {
            $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            $maxDistance: 50000
          }
        }
      });
    } else {
      clinics = await Clinic.find(query).sort({ rating: -1 });
    }
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching clinics', error: err.message });
  }
});

module.exports = router; 