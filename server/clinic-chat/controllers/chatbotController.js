const chatbotService = require('../utils/chatbotService');

/**
 * Send message to chatbot
 * @route POST /api/clinic/chatbot/message
 */
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?.id || req.ip; // Use user ID if authenticated, otherwise IP

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a non-empty string'
      });
    }

    // Check for emergency keywords
    if (chatbotService.isEmergency(message)) {
      return res.status(200).json({
        success: true,
        data: {
          message: chatbotService.getEmergencyResponse(),
          isEmergency: true,
          timestamp: new Date().toISOString()
        }
      });
    }

    // Get response from chatbot
    const response = await chatbotService.getChatbotResponse(message, userId);

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
 * @route GET /api/clinic/chatbot/history
 */
const getHistory = async (req, res) => {
  try {
    const userId = req.user?.id || req.ip;
    const history = chatbotService.getHistory(userId);

    res.status(200).json({
      success: true,
      data: {
        history: history,
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
 * @route DELETE /api/clinic/chatbot/history
 */
const clearHistory = async (req, res) => {
  try {
    const userId = req.user?.id || req.ip;
    chatbotService.clearHistory(userId);

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
 * Get chatbot status and information
 * @route GET /api/clinic/chatbot/status
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

module.exports = {
  sendMessage,
  getHistory,
  clearHistory,
  getStatus
}; 