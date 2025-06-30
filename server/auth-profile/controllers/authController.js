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
    const { userId, name, email, password, role, subscriptionPlan, subscriptionDuration } = req.body;
    
    console.log('Registration attempt:', { userId, name, email, role, hasFile: !!req.file });
    
    // Basic validation
    if (!userId || !name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters, include a number and an uppercase letter' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
    if (existingUser) {
      await Log.create({ message: 'Registration failed: user exists', level: 'warn', meta: { userId, email, role } });
      return res.status(400).json({ message: 'User with this email or ID already exists' });
    }
    
    // Certificate validation for doctor/hospital/clinic
    let certificate = null;
    if (role === 'doctor' || role === 'hospital' || role === 'clinic') {
      if (req.file) {
        certificate = req.file.filename;
      } else {
        // Make certificate optional for now, but log it
        console.log('No certificate provided for role:', role);
      }
    }
    
    // Subscription logic
    let subPlan = null, subStart = null, subEnd = null, subActive = false, premiumFeatures = false;
    if (role === 'clinic') {
      // Clinics: subscription is required
      if (!subscriptionPlan || !subscriptionDuration) {
        return res.status(400).json({ message: 'Clinics must select a subscription plan and duration' });
      }
      subPlan = subscriptionPlan;
      subStart = new Date();
      subEnd = new Date(Date.now() + parseInt(subscriptionDuration) * 24 * 60 * 60 * 1000); // duration in days
      subActive = true;
    } else if (role === 'doctor') {
      // Doctors: subscription is optional
      if (subscriptionPlan && subscriptionDuration) {
        subPlan = subscriptionPlan;
        subStart = new Date();
        subEnd = new Date(Date.now() + parseInt(subscriptionDuration) * 24 * 60 * 60 * 1000);
        subActive = true;
        premiumFeatures = true;
      } else {
        premiumFeatures = false;
      }
    } else if (role === 'supplier' || role === 'patient') {
      // Suppliers and patients: no subscription/certificate required for now
      subPlan = null;
      subStart = null;
      subEnd = null;
      subActive = false;
      premiumFeatures = false;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      userId, name, email, password: hashedPassword, role, certificate,
      subscriptionPlan: subPlan,
      subscriptionStart: subStart,
      subscriptionEnd: subEnd,
      subscriptionActive: subActive,
      premiumFeatures
    });
    
    await user.save();
    await Log.create({ message: 'User registered successfully', level: 'info', meta: { userId, email, role } });
    console.log('User registered successfully:', { userId, role });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    await Log.create({ message: 'Registration error', level: 'error', meta: { error: err.message } });
    console.error('Registration error:', err);
    res.status(400).json({ message: 'Registration error', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findOne({ userId });
    if (!user) {
      await Log.create({ message: 'Login failed: user not found', level: 'warn', meta: { userId } });
      return res.status(404).json({ message: 'User not found' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      await Log.create({ message: 'Login failed: incorrect password', level: 'warn', meta: { userId } });
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
    await Log.create({ message: 'User login successful', level: 'info', meta: { userId, role: user.role } });
    res.status(200).json({ token, premiumFeatures: user.premiumFeatures });
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