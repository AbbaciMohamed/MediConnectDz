const express = require('express');
const Tender = require('../models/Tender');
const router = express.Router();

// GET /api/tenders - list/search/filter tenders
router.get('/', async (req, res) => {
  try {
    const { search, category, region, status } = req.query;
    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { clinicName: { $regex: search, $options: 'i' } }
      ];
    }
    if (category && category !== 'all') query.category = category;
    if (region && region !== 'all') query.location = region;
    if (status && status !== 'all') query.status = status;
    const tenders = await Tender.find(query).sort({ deadline: 1 });
    res.json(tenders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tenders', error: err.message });
  }
});

// GET /api/tenders/:id - tender details
router.get('/:id', async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) return res.status(404).json({ message: 'Tender not found' });
    res.json(tender);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tender', error: err.message });
  }
});

// POST /api/tenders/:id/apply - supplier applies to a tender
router.post('/:id/apply', async (req, res) => {
  try {
    const { supplierId } = req.body;
    const tender = await Tender.findById(req.params.id);
    if (!tender) return res.status(404).json({ message: 'Tender not found' });
    if (!tender.applicants.includes(supplierId)) {
      tender.applicants.push(supplierId);
      await tender.save();
    }
    res.json({ message: 'Applied successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error applying to tender', error: err.message });
  }
});

module.exports = router; 