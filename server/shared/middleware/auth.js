const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

<<<<<<< HEAD
module.exports = auth; 
=======
// Placeholder auth middleware - to be implemented
const authenticateToken = async (req, res, next) => {
  // For now, just pass through - will be implemented by Ayoub
  next();
};

const authenticateAdmin = async (req, res, next) => {
  // For now, just pass through - will be implemented by Ayoub
  next();
};

const authenticateDoctor = async (req, res, next) => {
  // For now, just pass through - will be implemented by Ayoub
  next();
};

module.exports = {
  authenticateToken,
  authenticateAdmin,
  authenticateDoctor
}; 
>>>>>>> 60e8ea46ae399ddd87994bb31871f0b31cb43f20
