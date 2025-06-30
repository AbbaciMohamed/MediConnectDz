const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// System prompt for the medical chatbot
const SYSTEM_PROMPT = `You are MediConnectDz, a helpful medical assistant for the Algerian healthcare platform. Your role is to:

1. Provide general health information and guidance
2. Help users understand medical terms and conditions
3. Suggest when to consult a healthcare professional
4. Provide information about common symptoms and first aid
5. Answer questions about healthcare in Algeria
6. Be empathetic, professional, and culturally sensitive

IMPORTANT DISCLAIMERS:
- You are NOT a doctor and cannot provide medical diagnosis
- Always recommend consulting healthcare professionals for serious concerns
- For emergencies, advise calling emergency services immediately
- Be clear about the limitations of your advice

Respond in a helpful, professional manner while maintaining medical accuracy and safety.`;

class ChatbotService {
  constructor() {
    this.conversationHistory = new Map(); // Store conversation history by user ID
  }

  /**
   * Get response from ChatGPT
   * @param {string} message - User message
   * @param {string} userId - User ID for conversation history
   * @returns {Promise<string>} - AI response
   */
  async getChatbotResponse(message, userId) {
    try {
      // Get conversation history for this user
      const history = this.conversationHistory.get(userId) || [];
      
      // Prepare messages array
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history,
        { role: 'user', content: message }
      ];

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      const response = completion.choices[0].message.content;

      // Update conversation history
      const updatedHistory = [
        ...history,
        { role: 'user', content: message },
        { role: 'assistant', content: response }
      ];

      // Keep only last 10 messages to manage memory
      if (updatedHistory.length > 10) {
        updatedHistory.splice(0, 2); // Remove oldest user-assistant pair
      }

      this.conversationHistory.set(userId, updatedHistory);

      return response;

    } catch (error) {
      console.error('Chatbot API Error:', error);
      
      // Return a helpful error message
      return `I apologize, but I'm experiencing technical difficulties right now. Please try again in a moment, or contact our support team if the issue persists. For urgent medical concerns, please consult a healthcare professional directly.`;
    }
  }

  /**
   * Clear conversation history for a user
   * @param {string} userId - User ID
   */
  clearHistory(userId) {
    this.conversationHistory.delete(userId);
  }

  /**
   * Get conversation history for a user
   * @param {string} userId - User ID
   * @returns {Array} - Conversation history
   */
  getHistory(userId) {
    return this.conversationHistory.get(userId) || [];
  }

  /**
   * Check if the message is a medical emergency
   * @param {string} message - User message
   * @returns {boolean} - True if emergency keywords detected
   */
  isEmergency(message) {
    const emergencyKeywords = [
      'emergency', 'urgent', 'severe pain', 'chest pain', 'heart attack',
      'stroke', 'bleeding', 'unconscious', 'breathing difficulty',
      'suicide', 'overdose', 'accident', 'trauma', 'broken bone',
      'urgente', 'douleur sévère', 'douleur thoracique', 'crise cardiaque',
      'accident vasculaire', 'saignement', 'inconscient', 'difficulté respiratoire',
      'suicide', 'overdose', 'accident', 'traumatisme', 'fracture'
    ];

    const lowerMessage = message.toLowerCase();
    return emergencyKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  /**
   * Get emergency response
   * @returns {string} - Emergency response message
   */
  getEmergencyResponse() {
    return `🚨 URGENT: This appears to be a medical emergency. \n\nPlease take immediate action:\n1. Call emergency services: 14 (Algeria emergency number)\n2. Go to the nearest hospital emergency room\n3. Do not wait for online advice\n\nFor immediate medical assistance, please contact emergency services right away. This chatbot cannot provide emergency medical care.`;
  }
}

module.exports = new ChatbotService(); 