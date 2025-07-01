const express = require('express');
const { getProfile, updateProfile, generateShareKey, accessWithKey, setSchedule, getSchedule, getNotifications, markNotificationRead } = require('../controllers/profileController');
const auth = require('../../shared/middleware/auth');
const router = express.Router();

router.get('/:userId', auth, getProfile);
router.put('/:userId', auth, updateProfile);
router.post('/:userId/share-key', auth, generateShareKey);
router.post('/access-with-key', auth, accessWithKey);

// Doctor schedule management
router.post('/schedule', auth, setSchedule);
router.get('/schedule', auth, getSchedule);

// Doctor notifications
router.get('/notifications', auth, getNotifications);
router.post('/notifications/read', auth, markNotificationRead);

module.exports = router; 