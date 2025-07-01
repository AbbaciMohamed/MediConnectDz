const Tesseract = require('tesseract.js');

// Controller to handle document scanning
const scanDocument = async (req, res) => {
  try {
    const { image } = req.body; // Assume image is sent as base64
    if (!image) {
      return res.status(400).json({ message: 'No image provided' });
    }

    // Process the image using Tesseract.js for OCR
    const { data: { text } } = await Tesseract.recognize(
      Buffer.from(image, 'base64'),
      'eng',
      {
        logger: info => console.log(info) // Log progress
      }
    );

    // Return the extracted text
    res.status(200).json({ text });
  } catch (err) {
    console.error('Error processing document:', err);
    res.status(500).json({ message: 'Error processing document', error: err.message });
  }
};

module.exports = { scanDocument };
