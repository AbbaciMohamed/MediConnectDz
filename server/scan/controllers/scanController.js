const Tesseract = require('tesseract.js');
const Document = require('../models/Document');

// Controller to handle document scanning
const scanDocument = async (req, res) => {
  try {
    const { image, location, scanType = 'document', userId } = req.body;
    
    if (!image) {
      return res.status(400).json({ message: 'No image provided' });
    }

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Process the image using Tesseract.js for OCR
    const { data: { text, confidence } } = await Tesseract.recognize(
      Buffer.from(image, 'base64'),
      'eng',
      {
        logger: info => console.log(info) // Log progress
      }
    );

    // Save the document to database
    const document = new Document({
      userId,
      extractedText: text,
      location,
      scanType,
      confidence: confidence || 0
    });

    await document.save();

    // Return the extracted text and document info
    res.status(200).json({ 
      text, 
      confidence,
      documentId: document._id,
      message: 'Document scanned and saved successfully'
    });
  } catch (err) {
    console.error('Error processing document:', err);
    res.status(500).json({ message: 'Error processing document', error: err.message });
  }
};

// Get scan history for a user
const getScanHistory = async (req, res) => {
  try {
    const userId = req.query.userId;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const documents = await Document.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50); // Limit to last 50 scans

    res.status(200).json(documents);
  } catch (err) {
    console.error('Error fetching scan history:', err);
    res.status(500).json({ message: 'Error fetching scan history', error: err.message });
  }
};

// Get a specific document by ID
const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const document = await Document.findOne({ _id: id, userId });
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json(document);
  } catch (err) {
    console.error('Error fetching document:', err);
    res.status(500).json({ message: 'Error fetching document', error: err.message });
  }
};

// Delete a document
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const document = await Document.findOneAndDelete({ _id: id, userId });
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(500).json({ message: 'Error deleting document', error: err.message });
  }
};

module.exports = { 
  scanDocument, 
  getScanHistory, 
  getDocumentById, 
  deleteDocument 
};
