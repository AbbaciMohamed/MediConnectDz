const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const auth = require('../../shared/middleware/auth');

// GET /api/logs - fetch logs (admin only)
router.get('/', auth, async (req, res) => {
  // Only allow admin users
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const { level, limit = 100, skip = 0, search } = req.query;
    const query = {};
    if (level) query.level = level;
    if (search) query.message = { $regex: search, $options: 'i' };
    const logs = await Log.find(query)
      .sort({ timestamp: -1 })
      .skip(Number(skip))
      .limit(Number(limit));
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching logs', error: err.message });
  }
});

module.exports = router;
