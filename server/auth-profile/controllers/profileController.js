const User = require('../models/User');
const ShareKey = require('../models/ShareKey');
const crypto = require('crypto');
// const QRCode = require('qrcode'); // Uncomment if you want to generate QR images

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    // Only allow update if user is self or doctor with valid share key
    const requesterId = req.user.userId;
    const targetId = req.params.userId;
    const role = req.user.role;
    let allowed = false;
    if (requesterId === targetId) {
      allowed = true;
    } else if (role === 'doctor') {
      // Check if doctor has a valid, unused share key for this patient
      const keyDoc = await ShareKey.findOne({ patientId: targetId, doctorId: requesterId, used: true, expiresAt: { $gt: new Date() } });
      if (keyDoc) allowed = true;
    }
    if (!allowed) return res.status(403).json({ message: 'Not authorized to update this profile' });
    const user = await User.findOneAndUpdate(
      { userId: targetId },
      { $set: { profile: req.body } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    // Audit log: you can extend this to a dedicated collection if needed
    console.log(`[AUDIT] Profile updated by ${requesterId} for ${targetId} at ${new Date().toISOString()}`);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};

// Helper: generate random key
function generateKey(length = 12) {
  return crypto.randomBytes(length).toString('hex');
}

// POST /profile/:userId/share-key (patient generates a share key)
const generateShareKey = async (req, res) => {
  try {
    const patientId = req.params.userId;
    if (req.user.userId !== patientId) return res.status(403).json({ message: 'Only the patient can generate a share key' });
    const key = generateKey(8);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    const shareKey = new ShareKey({ key, patientId, expiresAt });
    await shareKey.save();
    // Optionally generate QR code string (uncomment if using qrcode package)
    // const qr = await QRCode.toDataURL(key);
    res.json({ key, expiresAt /*, qr */ });
  } catch (err) {
    res.status(500).json({ message: 'Error generating share key', error: err.message });
  }
};

// POST /profile/access-with-key (doctor uses key to access patient)
const accessWithKey = async (req, res) => {
  try {
    const { key } = req.body;
    const doctorId = req.user.userId;
    const role = req.user.role;
    if (role !== 'doctor') return res.status(403).json({ message: 'Only doctors can use share keys' });
    const keyDoc = await ShareKey.findOne({ key, used: false, expiresAt: { $gt: new Date() } });
    if (!keyDoc) return res.status(400).json({ message: 'Invalid or expired key' });
    // Mark key as used and assign doctor
    keyDoc.used = true;
    keyDoc.doctorId = doctorId;
    await keyDoc.save();
    res.json({ message: 'Access granted', patientId: keyDoc.patientId });
  } catch (err) {
    res.status(500).json({ message: 'Error accessing with key', error: err.message });
  }
};

// Doctor: set or update working hours
const setSchedule = async (req, res) => {
  try {
    if (req.user.role !== 'doctor') return res.status(403).json({ message: 'Only doctors can set schedule' });
    const user = await User.findOneAndUpdate(
      { userId: req.user.userId },
      { $set: { schedule: req.body.schedule } },
      { new: true }
    );
    res.json(user.schedule);
  } catch (err) {
    res.status(500).json({ message: 'Error setting schedule', error: err.message });
  }
};

// Doctor: get working hours
const getSchedule = async (req, res) => {
  try {
    if (req.user.role !== 'doctor') return res.status(403).json({ message: 'Only doctors can view schedule' });
    const user = await User.findOne({ userId: req.user.userId });
    res.json(user.schedule);
  } catch (err) {
    res.status(500).json({ message: 'Error getting schedule', error: err.message });
  }
};

// Doctor: get notifications
const getNotifications = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId });
    res.json(user.notifications || []);
  } catch (err) {
    res.status(500).json({ message: 'Error getting notifications', error: err.message });
  }
};

// Doctor: mark notification as read
const markNotificationRead = async (req, res) => {
  try {
    const { notificationIndex } = req.body;
    const user = await User.findOne({ userId: req.user.userId });
    if (!user.notifications || !user.notifications[notificationIndex]) return res.status(404).json({ message: 'Notification not found' });
    user.notifications[notificationIndex].read = true;
    await user.save();
    res.json(user.notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error marking notification as read', error: err.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  generateShareKey,
  accessWithKey,
  setSchedule,
  getSchedule,
  getNotifications,
  markNotificationRead
}; 