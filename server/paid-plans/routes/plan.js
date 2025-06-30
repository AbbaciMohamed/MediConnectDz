const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const auth = require('../../shared/middleware/auth');

// Get current user's plan
router.get('/me', auth, planController.getMyPlan);
// Update current user's plan
router.put('/me', auth, planController.updateMyPlan);
// Admin: update any user's plan
router.put('/:userId', auth, (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
}, planController.adminUpdatePlan);

module.exports = router; 