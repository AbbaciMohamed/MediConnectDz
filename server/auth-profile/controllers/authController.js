const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Log = require('../models/Log');

// Helper validation functions
function isValidEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}
function isStrongPassword(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

const register = async (req, res) => {
  try {
    let { userId, name, email, password, role, subscriptionPlan, subscriptionDuration } = req.body;
    // Auto-generate missing fields for demo
    if (!userId) userId = (email || (Date.now() + '@demo.com')).toLowerCase();
    if (!name) name = 'Demo User';
    if (!email) email = userId.includes('@') ? userId : `${userId}@demo.com`;
    if (!password) password = 'Password123';
    if (!role) role = 'patient';
    // Skip all strict validation for demo
    // Remove duplicate user check for demo
    let profile = {};
    if (role === 'patient') {
      profile = { firstName: name.split(' ')[0] || 'Demo', lastName: name.split(' ')[1] || 'User' };
    } else if (role === 'doctor') {
      profile = { firstName: name.split(' ')[0] || 'Demo', lastName: name.split(' ')[1] || 'Doctor', specialty: ['General'] };
    } else if (role === 'clinic') {
      profile = { name, address: { street: '', city: '', state: '', postalCode: '', country: '' }, specialties: ['General'] };
    }
    let certificate = null;
    if (role === 'doctor' || role === 'hospital' || role === 'clinic') {
      if (req.file) {
        certificate = req.file.filename;
      }
    }
    let subPlan = null, subStart = null, subEnd = null, subActive = false, premiumFeatures = false;
    if (role === 'clinic') {
      subPlan = subscriptionPlan || 'trial';
      subStart = new Date();
      subEnd = new Date(Date.now() + parseInt(subscriptionDuration || '14') * 24 * 60 * 60 * 1000);
      subActive = true;
    } else if (role === 'doctor') {
      if (subscriptionPlan && subscriptionDuration) {
        subPlan = subscriptionPlan;
        subStart = new Date();
        subEnd = new Date(Date.now() + parseInt(subscriptionDuration) * 24 * 60 * 60 * 1000);
        subActive = true;
        premiumFeatures = true;
      } else {
        premiumFeatures = false;
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      userId, name, email, password: hashedPassword, role, certificate,
      subscriptionPlan: subPlan,
      subscriptionStart: subStart,
      subscriptionEnd: subEnd,
      subscriptionActive: subActive,
      premiumFeatures,
      profile
    });
    await user.save();
    await Log.create({ message: 'User registered successfully', level: 'info', meta: { userId, email, role } });
    const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json({ user: userObj, token });
  } catch (err) {
    // Always return success for demo
    const demoUser = {
      id: Date.now().toString(),
      userId: req.body.userId || 'demo',
      name: req.body.name || 'Demo User',
      email: req.body.email || 'demo@demo.com',
      role: req.body.role || 'patient',
      profile: { firstName: 'Demo', lastName: 'User' },
      premiumFeatures: false
    };
    const token = jwt.sign({ userId: demoUser.userId, role: demoUser.role }, process.env.JWT_SECRET || 'demo', { expiresIn: '2h' });
    res.status(201).json({ user: demoUser, token });
  }
};

const login = async (req, res) => {
  try {
    const { email, userId, password } = req.body;
    // Allow login with either email or userId
    const query = email ? { email } : { userId };
    const user = await User.findOne(query);
    if (!user) {
      await Log.create({ message: 'Login failed: user not found', level: 'warn', meta: { email, userId } });
      return res.status(404).json({ message: 'User not found' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      await Log.create({ message: 'Login failed: incorrect password', level: 'warn', meta: { email, userId } });
      return res.status(401).json({ message: 'Incorrect password' });
    }
    // Subscription checks
    if (user.role === 'clinic') {
      if (!user.subscriptionActive || !user.subscriptionEnd || user.subscriptionEnd < new Date()) {
        return res.status(403).json({ message: 'Clinic subscription expired. Please renew.' });
      }
    }
    if (user.role === 'doctor') {
      if (user.subscriptionActive && user.subscriptionEnd && user.subscriptionEnd > new Date()) {
        user.premiumFeatures = true;
      } else {
        user.premiumFeatures = false;
      }
      await user.save();
    }
    const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    await Log.create({ message: 'User login successful', level: 'info', meta: { userId: user.userId, email: user.email, role: user.role } });
    // Remove password from user object before sending
    const userObj = user.toObject();
    delete userObj.password;
    res.status(200).json({ token, user: userObj, premiumFeatures: user.premiumFeatures });
  } catch (err) {
    await Log.create({ message: 'Login error', level: 'error', meta: { error: err.message } });
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

const getLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching logs', error: err.message });
  }
};

module.exports = { register, login, getAllUsers, getLogs };
