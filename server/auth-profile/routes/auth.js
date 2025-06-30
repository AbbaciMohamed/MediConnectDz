const express = require('express');
<<<<<<< HEAD
const { register, login, getAllUsers, getLogs } = require('../controllers/authController');
=======
const { register, login } = require('../controllers/authController');
>>>>>>> 60e8ea46ae399ddd87994bb31871f0b31cb43f20
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
<<<<<<< HEAD
router.get('/users', getAllUsers);
router.get('/logs', getLogs);
=======
>>>>>>> 60e8ea46ae399ddd87994bb31871f0b31cb43f20

module.exports = router; 