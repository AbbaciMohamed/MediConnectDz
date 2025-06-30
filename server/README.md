# MediConnectDz Server

## Setup Instructions

### Environment Variables

Create a `.env` file in the server directory with the following variables:

```
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Database Configuration
DB_URI=mongodb://localhost:27017/mediconnectdz

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret
JWT_SECRET=your_jwt_secret_here
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables in `.env` file

3. Start the server:
```bash
npm start
```

### Features

- Authentication and user management
- Chatbot integration with OpenAI
- Chat functionality
- Profile management 