const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// Import controller functions
const {
  register,
  login,
  getAllUsers,
  getLogs
} = require('../controllers/authController');

// Set up Multer storage for certificate uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure path is correct: project/uploads/
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

/**
 * @route   POST /api/auth/register
 * @desc    Register user (patients, doctors, clinics, etc.)
 * @access  Public
 * @form    Multipart if certificate is uploaded
 */
router.post('/register', upload.single('certificate'), register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   GET /api/auth/users
 * @desc    Get all users (for admin panel or logs)
 * @access  Admin (protected in future)
 */
router.get('/users', getAllUsers);

/**
 * @route   GET /api/auth/logs
@desc    Get auth-related logs (optional feature)
  @access  Admin (protected in future)
 */
router.get('/logs', getLogs);

module.exports = router;