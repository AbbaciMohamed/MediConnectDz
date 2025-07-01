const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  const userId = req.user.userId;
  const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
  res.json(notifications);
};

exports.markRead = async (req, res) => {
  const { notificationId } = req.body;
  await Notification.findByIdAndUpdate(notificationId, { read: true });
  res.json({ success: true });
};

// System/internal use
exports.createNotification = async ({ userId, type, message, meta }) => {
  await Notification.create({ userId, type, message, meta });
};

// Example triggers (to be called from booking, subscription, etc.)
exports.notifyBooking = async (userId, doctorName, date) => {
  await exports.createNotification({
    userId,
    type: 'booking',
    message: `Your appointment with Dr. ${doctorName} is booked for ${date}.`,
    meta: { doctorName, date }
  });
};
exports.notifySubscriptionExpiry = async (userId, expiryDate) => {
  await exports.createNotification({
    userId,
    type: 'subscription',
    message: `Your subscription will expire on ${expiryDate}. Please renew to continue enjoying our services.`,
    meta: { expiryDate }
  });
}; 