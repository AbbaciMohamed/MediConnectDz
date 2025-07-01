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

// POST /api/nearby-clinics - find clinics near given coordinates
router.post('/nearby-clinics', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ message: 'Latitude and longitude are required and must be numbers.' });
    }
    const clinics = await Clinic.find({
      mapCoordinates: {
        $near: {
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          $maxDistance: 50000 // 50km radius
        }
      }
    }).limit(20);
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ message: 'Error finding nearby clinics', error: err.message });
  }
});

// POST /api/request-location - instruct frontend to request location permission
router.post('/request-location', (req, res) => {
  res.json({
    action: 'request_location',
    message: 'Please enable location to find clinics near you.'
  });
});

module.exports = router; 