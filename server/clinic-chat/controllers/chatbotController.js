const {
  isEmergency,
  getEmergencyResponse,
  getChatbotResponse,
  getHistory,
  clearHistory,


} = require('../utils/chatbotService');
const { getLLMReply } = require('../utils/chatbotService');
const Clinic = require('../models/Clinic');
const Message = require('../models/Message');

/**
 * Send message to chatbot
 */
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?.id || req.ip;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a non-empty string'
      });
    }

    // Store user message
    await Message.create({
      from: userId,
      to: 'bot',
      content: message,
      timestamp: new Date(),
      read: true
    });

    if (isEmergency(message)) {
      const emergencyMsg = getEmergencyResponse();
      // Store bot emergency response
      await Message.create({
        from: 'bot',
        to: userId,
        content: emergencyMsg,
        timestamp: new Date(),
        read: false
      });
      return res.status(200).json({
        success: true,
        data: {
          message: emergencyMsg,
          isEmergency: true,
          timestamp: new Date().toISOString()
        }
      });
    }

    const response = await getChatbotResponse(message, userId);

    // Store bot response
    await Message.create({
      from: 'bot',
      to: userId,
      content: response,
      timestamp: new Date(),
      read: false
    });

    res.status(200).json({
      success: true,
      data: {
        message: response,
        isEmergency: false,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Chatbot Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    });
  }
};

/**
 * Get conversation history
 */
const History = async (req, res) => {
  try {
    const userId = req.user?.id || req.ip;
    const history = getHistory(userId);

    res.status(200).json({
      success: true,
      data: {
        history,
        count: history.length
      }
    });

  } catch (error) {
    console.error('Get History Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve conversation history'
    });
  }
};

/**
 * Clear conversation history
 */
const deleteHistory = async (req, res) => {
  try {
    const userId = req.user?.id || req.ip;
    clearHistory(userId);

    res.status(200).json({
      success: true,
      message: 'Conversation history cleared successfully'
    });

  } catch (error) {
    console.error('Clear History Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to clear conversation history'
    });
  }
};

/**
 * Get chatbot status
 */
const getStatus = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        status: 'online',
        name: 'MediConnectDz AI Assistant',
        description: 'Your medical information assistant',
        capabilities: [
          'General health information',
          'Medical term explanations',
          'Symptom guidance',
          'First aid information',
          'Healthcare recommendations'
        ],
        disclaimers: [
          'Not a substitute for professional medical advice',
          'Cannot provide medical diagnosis',
          'For emergencies, contact emergency services immediately'
        ],
        emergencyNumber: '14',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Get Status Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get chatbot status'
    });
  }
};

/**
 * AI-enhanced chatbot intent classifier
 */
const chatbotMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ reply: 'Invalid message format.' });
    }

    const intent = await getLLMReply(`Classify the intent of this message: "${message}". Possible intents: finder, symptom, navigation, education. Respond with only the intent.`);

    if (intent.includes('finder')) {
      const specialty = await getLLMReply(`Extract the specialty from: "${message}". Respond with only the specialty.`);
      const location = await getLLMReply(`Extract the location from: "${message}". Respond with only the location.`);
      const clinics = await Clinic.find({
        specialties: { $regex: specialty, $options: 'i' },
        location: { $regex: location, $options: 'i' }
      });

      if (clinics.length > 0) {
        return res.json({ reply: `Here are some ${specialty}s in ${location}:`, clinics });
      } else {
        return res.json({ reply: `Sorry, I couldn't find any ${specialty}s in ${location}.` });
      }
    }

    if (intent.includes('symptom')) {
      const advice = await getLLMReply(`A user says: "${message}". Give general advice (not a diagnosis). Add a disclaimer: This is not medical advice.`);
      return res.json({ reply: advice });
    }

    if (intent.includes('navigation')) {
      const clinicName = await getLLMReply(`Extract the clinic name from: "${message}". Respond with only the clinic name.`);
      const clinic = await Clinic.findOne({ name: { $regex: clinicName, $options: 'i' } });

      if (clinic) {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`;
        return res.json({ reply: `Here is the location for ${clinic.name}:`, mapsUrl });
      }

      return res.json({ reply: "Sorry, I couldn't find that clinic." });
    }

    // Default fallback
    const answer = await getLLMReply(message);
    return res.json({ reply: answer });

  } catch (error) {
    console.error('Chatbot Message Error:', error);
    res.status(500).json({ reply: 'Something went wrong. Please try again later.' });
  }
};



module.exports = {
  sendMessage,
  History,
  deleteHistory,
  getStatus,      // ✅ Ensure this is exported
  chatbotMessage
};
