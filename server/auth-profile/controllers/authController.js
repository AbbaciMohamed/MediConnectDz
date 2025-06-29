const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helper validation functions
function isValidEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}
function isStrongPassword(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

const register = async (req, res) => {
  try {
    const { userId, name, email, password, role } = req.body;
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
    // Certificate validation for doctor/hospital
    let certificate = null;
    if (role === 'doctor' || role === 'hospital') {
      if (!req.file) {
        return res.status(400).json({ message: 'Certificate file is required for doctor/hospital' });
      }
      certificate = req.file.filename;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ userId, name, email, password: hashedPassword, role, certificate });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ message: 'Registration error', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect password' });
    const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

module.exports = { register, login }; 