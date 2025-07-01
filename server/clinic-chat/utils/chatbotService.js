const OpenAI = require('openai');
const axios = require('axios');
require('dotenv').config();

const SYSTEM_PROMPT = `You are MediConnectDz, a helpful medical assistant for the Algerian healthcare platform. [...]`;

class ChatbotService {
  constructor() {
    this.conversationHistory = new Map();

    // Initialize OpenAI client if API key exists
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    }
  }

  async getChatbotResponse(message, userId) {
    try {
      const history = this.conversationHistory.get(userId) || [];
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history,
        { role: 'user', content: message }
      ];

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 500,
        temperature: 0.7
      });

      const response = completion.choices[0].message.content;

      const updatedHistory = [...history, { role: 'user', content: message }, { role: 'assistant', content: response }];
      if (updatedHistory.length > 10) updatedHistory.splice(0, 2);

      this.conversationHistory.set(userId, updatedHistory);
      return response;

    } catch (error) {
      console.error('Chatbot API Error:', error);
      return `⚠️ I’m having technical difficulties. Please try again later or consult a healthcare provider directly.`;
    }
  }

  clearHistory(userId) {
    this.conversationHistory.delete(userId);
  }

  getHistory(userId) {
    return this.conversationHistory.get(userId) || [];
  }

  isEmergency(message) {
    const emergencyKeywords = [/* list as before */];
    return emergencyKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }

  getEmergencyResponse() {
    return `🚨 URGENT: This appears to be a medical emergency. [...]`;
  }
}

// ✅ Export both the class and helper using a unified structure
const chatbotService = new ChatbotService();

const getLLMReply = async (prompt) => {
  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) {
    throw new Error('LLM_API_KEY not set in .env');
  }

  try {
    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }]
    }, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });

    return response.data.choices[0].message.content.trim();

  } catch (err) {
    console.error('LLM API Error:', err?.response?.data || err.message);
    return '⚠️ Failed to get a response from the LLM.';
  }
};

module.exports = {
  ...chatbotService,
  getLLMReply
};
