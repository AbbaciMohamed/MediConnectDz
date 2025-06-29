const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./shared/db');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Connect to MongoDB
connectDB();

// Routers (to be implemented in each domain)
// Example: app.use('/auth', require('./auth-profile/routes/authRoutes'));
// Example: app.use('/chat', require('./clinic-chat/routes/chatRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 