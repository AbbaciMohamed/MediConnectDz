const ComplianceLog = require('../models/ComplianceLog');

// Simulate device security scan
exports.submitScan = async (req, res) => {
  try {
    const { deviceInfo, result } = req.body;
    const log = new ComplianceLog({
      userId: req.user.userId,
      action: 'device_scan',
      deviceInfo,
      result
    });
    await log.save();
    res.status(201).json({ message: 'Scan submitted', log });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting scan', error: err.message });
  }
};

// Log a compliance action (login, sensitive access, etc.)
exports.logAction = async (userId, action, deviceInfo, result) => {
  const log = new ComplianceLog({ userId, action, deviceInfo, result });
  await log.save();
};

// Get compliance history for user (or all if admin)
exports.getHistory = async (req, res) => {
  try {
    let logs;
    if (req.user.role === 'admin' && req.query.userId) {
      logs = await ComplianceLog.find({ userId: req.query.userId });
    } else {
      logs = await ComplianceLog.find({ userId: req.user.userId });
    }
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching history', error: err.message });
  }
}; 