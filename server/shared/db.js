const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// Example seed function for testing
const seedExampleUsers = async () => {
  const User = require('../auth-profile/models/User');
  const users = [
    {
      userId: 'patient1',
      name: 'Ahmed Patient',
      email: 'ahmed.patient@example.com',
      password: await require('bcrypt').hash('password123', 10),
      role: 'patient',
    },
    {
      userId: 'doctor1',
      name: 'Dr. Samira',
      email: 'samira.doctor@example.com',
      password: await require('bcrypt').hash('password123', 10),
      role: 'doctor',
    },
    {
      userId: 'admin1',
      name: 'Admin User',
      email: 'admin@example.com',
      password: await require('bcrypt').hash('adminpass', 10),
      role: 'admin',
    },
  ];
  await User.deleteMany({}); // Clear existing users
  await User.insertMany(users);
  console.log('Seeded example users!');
};

module.exports = mongoose;
module.exports.seedExampleUsers = seedExampleUsers; 