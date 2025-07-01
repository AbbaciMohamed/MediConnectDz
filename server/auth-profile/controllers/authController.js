const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Log = require('../models/Log');

// Helper validation functions
function isValidEmail(email) {
  return email.includes('@'); // Simplified email validation
}
function isStrongPassword(password) {
  return password.length >= 6; // Simplified password validation
}

const register = async (req, res) => {
  try {
    let { userId, name, email, password, role } = req.body;
    // Simplify registration logic
    if (!userId) userId = (email || (Date.now() + '@demo.com')).toLowerCase();
    if (!name) name = 'User';
    if (!email) email = userId.includes('@') ? userId : `${userId}@demo.com`;
    if (!password) password = 'Password123';
    if (!role) role = 'patient';
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      userId, name, email, password: hashedPassword, role,
      profile: { firstName: name.split(' ')[0], lastName: name.split(' ')[1] || '' }
    });
    await user.save();
    const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json({ user: userObj, token });
  } catch (err) {
    res.status(500).json({ message: 'Registration error', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, userId, password } = req.body;
    const query = email ? { email } : { userId };
    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    const userObj = user.toObject();
    delete userObj.password;
    res.status(200).json({ token, user: userObj });
  } catch (err) {
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
