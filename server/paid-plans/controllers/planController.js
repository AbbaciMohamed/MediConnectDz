const User = require('../../auth-profile/models/User');
const notificationController = require('../../auth-profile/controllers/notificationController');

// Get current user's plan
exports.getMyPlan = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId });
    res.json({ planType: user.planType, planActivatedAt: user.planActivatedAt, planExpiresAt: user.planExpiresAt });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching plan', error: err.message });
  }
};

// Update current user's plan
exports.updateMyPlan = async (req, res) => {
  try {
    const { planType, planExpiresAt } = req.body;
    if (!['Basic', 'Pro', 'Enterprise'].includes(planType)) {
      return res.status(400).json({ message: 'Invalid plan type' });
    }
    const user = await User.findOneAndUpdate(
      { userId: req.user.userId },
      { planType, planActivatedAt: new Date(), planExpiresAt },
      { new: true }
    );
    await notificationController.notifySubscriptionExpiry(req.user.userId, planExpiresAt);
    res.json({ planType: user.planType, planActivatedAt: user.planActivatedAt, planExpiresAt: user.planExpiresAt });
  } catch (err) {
    res.status(500).json({ message: 'Error updating plan', error: err.message });
  }
};

// Admin: update any user's plan
exports.adminUpdatePlan = async (req, res) => {
  try {
    const { userId } = req.params;
    const { planType, planExpiresAt } = req.body;
    if (!['Basic', 'Pro', 'Enterprise'].includes(planType)) {
      return res.status(400).json({ message: 'Invalid plan type' });
    }
    const user = await User.findOneAndUpdate(
      { userId },
      { planType, planActivatedAt: new Date(), planExpiresAt },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    await notificationController.notifySubscriptionExpiry(userId, planExpiresAt);
    res.json({ planType: user.planType, planActivatedAt: user.planActivatedAt, planExpiresAt: user.planExpiresAt });
  } catch (err) {
    res.status(500).json({ message: 'Error updating plan', error: err.message });
  }
}; 