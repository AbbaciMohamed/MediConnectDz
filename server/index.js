require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./shared/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
db = connectDB();

// Routers
app.use('/auth', require('./auth-profile/routes/auth'));
app.use('/profile', require('./auth-profile/routes/profile'));
app.use('/appointments', require('./auth-profile/routes/appointment'));
app.use('/chat', require('./clinic-chat/routes/chat'));

app.use((req, res) => res.status(404).json({ message: 'Not Found' }));
app.use((err, req, res, next) => res.status(500).json({ message: 'Internal Server Error' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 