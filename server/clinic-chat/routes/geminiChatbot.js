const express = require('express');
const router = express.Router();

// Simulated Gemini AI Chatbot endpoint
router.post('/', async (req, res) => {
  const { message, role } = req.body;
  // Simple static responses for demo; replace with real AI integration as needed
  const responses = {
    patient: {
      'find clinic': "I can help you find clinics near you! Please provide your location.",
      'appointment': "To book an appointment, search for a clinic and select an available time slot.",
      'vaccines': "Common vaccines include flu, COVID-19, hepatitis. Please consult your doctor for personalized advice.",
      'emergency': "For emergencies, call 14 (SAMU) or 15 (Civil Protection) immediately."
    },
    clinic: {
      'security': "The Security Medicine Suite provides vulnerability assessment, compliance check, and device monitoring.",
      'analytics': "Your analytics dashboard provides insights into appointments, revenue, and patient trends.",
      'subscription': "You can manage your subscription in the dashboard. Upgrade options are available.",
      'compliance': "Compliance reports are available in the Security Suite."
    },
    supplier: {
      'bid': "To bid on tenders, go to the marketplace and select an open tender.",
      'upload': "You can upload clinical data in your supplier dashboard.",
      'contact': "Contact clinics directly through the messaging system."
    }
  };
  const lowerMsg = (message || '').toLowerCase();
  const roleResponses = responses[role] || responses['patient'];
  let reply = null;
  for (const key in roleResponses) {
    if (lowerMsg.includes(key)) {
      reply = roleResponses[key];
      break;
    }
  }
  if (!reply) {
    reply = "I'm here to help! Please ask your question about our healthcare platform.";
  }
  res.json({ response: reply });
});

module.exports = router; 