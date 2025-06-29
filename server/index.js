require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const connectDB = require('./shared/db');

const app = express();

// Security
app.use(helmet());

// CORS for React frontend (adjust origin as needed)
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

app.use(express.json());
app.use(morgan('dev'));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Health check endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Swagger API docs
const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
db = connectDB();

// Routers
app.use('/auth', require('./auth-profile/routes/auth'));
app.use('/profile', require('./auth-profile/routes/profile'));
app.use('/appointments', require('./auth-profile/routes/appointment'));
app.use('/chat', require('./clinic-chat/routes/chat'));

app.use((req, res) => res.status(404).json({ message: 'Not Found' }));
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 