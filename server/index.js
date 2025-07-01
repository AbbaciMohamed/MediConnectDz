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

connectDB();
if (process.env.OPENAI_API_KEY) {
  console.log('✅ OpenAI API key loaded.');
} else {
  console.warn('⚠️ OpenAI API key NOT found. Please check your .env file.');
}


// Security
app.use(helmet());

// CORS for React frontend (adjust origin as needed)
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'], credentials: true }));

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

// Routers
app.use('/auth', require('./auth-profile/routes/auth'));
app.use('/profile', require('./auth-profile/routes/profile'));
app.use('/appointments', require('./auth-profile/routes/appointment'));
app.use('/chat', require('./clinic-chat/routes/chat'));
app.use('/plans', require('./paid-plans/routes/plan'));
app.use('/compliance', require('./compliance/routes/compliance'));
app.use('/analytics', require('./clinic-chat/routes/analytics'));
app.use('/sponsor', require('./clinic-chat/routes/sponsor'));
app.use('/api/tenders', require('./clinic-chat/routes/marketplace'));
app.use('/api/clinics', require('./clinic-chat/routes/clinicSearch'));
app.use('/api/clinics', require('./clinic-chat/routes/clinicProfile'));
app.use('/api/gemini-chatbot', require('./clinic-chat/routes/geminiChatbot'));
app.use('/api/analytics', require('./clinic-chat/routes/analytics'));
app.use('/api/orgs', require('./clinic-chat/routes/orgs'));
app.use('/api/notifications', require('./auth-profile/routes/notification'));
app.use('/api/clinics/chatbot', require('./clinic-chat/routes/chatbot'));
app.use('/api/auth', require('./auth-profile/routes/auth'));
// Medical Document Q&A Scan feature


app.use((req, res) => res.status(404).json({ message: 'Not Found' }));
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 


