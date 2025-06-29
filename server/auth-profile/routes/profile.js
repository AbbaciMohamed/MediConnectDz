const express = require('express');
const { getProfile, updateProfile, generateShareKey, accessWithKey, setSchedule, getSchedule, getNotifications, markNotificationRead } = require('../controllers/profileController');
const auth = require('../../shared/middleware/auth');
const router = express.Router();
const { body } = require('express-validator');
const profileController = require('../controllers/profileController');
const { validateRequest } = require('../../shared/middleware/validation');
const { authenticateToken } = require('../../shared/middleware/auth');

// Get user profile
router.get('/', authenticateToken, profileController.getProfile);

// Update user profile
router.put('/', [
  authenticateToken,
  body('firstName').optional().notEmpty().trim(),
  body('lastName').optional().notEmpty().trim(),
  body('phone').optional().isMobilePhone(),
  body('dateOfBirth').optional().isISO8601(),
  body('gender').optional().isIn(['male', 'female', 'other']),
  validateRequest
], profileController.updateProfile);

// Upload profile picture
router.post('/avatar', authenticateToken, profileController.uploadAvatar);

// Delete profile picture
router.delete('/avatar', authenticateToken, profileController.deleteAvatar);

// Change password
router.put('/change-password', [
  authenticateToken,
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 6 }),
  validateRequest
], profileController.changePassword);

// Doctor schedule management
router.post('/schedule', auth, setSchedule);
router.get('/schedule', auth, getSchedule);

// Doctor notifications
router.get('/notifications', auth, getNotifications);
router.post('/notifications/read', auth, markNotificationRead);

module.exports = router; 