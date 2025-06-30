const express = require('express');
const router = express.Router();
const complianceController = require('../controllers/complianceController');
const auth = require('../../shared/middleware/auth');

// Submit a simulated device scan
router.post('/scan', auth, complianceController.submitScan);
// Get compliance history
router.get('/history', auth, complianceController.getHistory);

module.exports = router; 