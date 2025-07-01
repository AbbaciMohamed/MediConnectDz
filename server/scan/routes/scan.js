const express = require('express');
const router = express.Router();
const { scanDocument } = require('../controllers/scanController');

// Route to handle document scanning
router.post('/scan', scanDocument);

module.exports = router;
