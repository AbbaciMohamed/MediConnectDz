const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer for certificate uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post('/register', upload.single('certificate'), register);
router.post('/login', login);

module.exports = router; 