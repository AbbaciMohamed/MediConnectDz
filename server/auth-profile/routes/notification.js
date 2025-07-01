const express = require('express');
const router = express.Router();
const auth = require('../../shared/middleware/auth');
const notificationController = require('../controllers/notificationController');

router.get('/', auth, notificationController.getNotifications);
router.post('/read', auth, notificationController.markRead);

module.exports = router; 