const express = require('express');
const router = express.Router();
const { 
  scanDocument, 
  getScanHistory, 
  getDocumentById, 
  deleteDocument 
} = require('../controllers/scanController');

// Route to handle document scanning
router.post('/scan', scanDocument);

// Route to get scan history
router.get('/history', getScanHistory);

// Route to get a specific document
router.get('/document/:id', getDocumentById);

// Route to delete a document
router.delete('/document/:id', deleteDocument);

module.exports = router;
