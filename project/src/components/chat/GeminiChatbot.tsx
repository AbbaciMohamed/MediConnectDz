import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, User, Bot, Minimize2, Maximize2 } from 'lucide-react';
import { ChatMessage } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const GeminiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState<'patient' | 'clinic' | 'supplier' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user) {
      setUserRole(user.role);
    }
  }, [user]);

  const roleQuickReplies = {
    patient: [
      'Find a clinic near me',
      'Book an appointment',
      'What vaccines do I need?',
      'Emergency services'
    ],
    clinic: [
      'Configure security scan',
      'View analytics dashboard',
      'Manage subscription',
      'Generate compliance report'
    ],
    supplier: [
      'How to bid on tenders?',
      'Upload clinical data',
      'View active RFPs',
      'Contact clinic directly'
    ]
  };

  const getSystemPrompt = (role: string) => {
    const prompts = {
      patient: "You are a helpful healthcare assistant for patients. Help them find clinics, book appointments, understand medical procedures, and provide general health information. Always recommend consulting with healthcare professionals for medical advice.",
      clinic: "You are a healthcare platform assistant for clinic administrators. Help them with platform features, security settings, analytics, subscription management, and compliance requirements.",
      supplier: "You are a marketplace assistant for pharmaceutical suppliers. Help them understand the tender process, upload documents, find relevant opportunities, and connect with healthcare providers."
    };
    return prompts[role as keyof typeof prompts] || prompts.patient;
  };

  const simulateGeminiResponse = async (message: string, role: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const responses = {
      patient: {
        'find clinic': "I can help you find clinics near you! To get started, I'll need to know your location and what type of healthcare service you're looking for. Are you looking for:\n\n• General medicine\n• Specialist care (cardiology, dermatology, etc.)\n• Emergency services\n• Dental care\n\nYou can also use our clinic search feature on the main page to filter by location, specialty, and insurance accepted.",
        'appointment': "To book an appointment, you can:\n\n1. **Search for a clinic** using our clinic finder\n2. **Select your preferred provider** from the results\n3. **Choose an available time slot** that works for you\n4. **Confirm your booking** with your contact details\n\nWould you like me to guide you through finding a specific type of healthcare provider?",
        'vaccines': "Vaccination needs depend on several factors including your age, health conditions, travel plans, and vaccination history. Common vaccines for adults in Algeria include:\n\n• **Annual flu vaccine**\n• **COVID-19 boosters**\n• **Hepatitis A & B** (especially for healthcare workers)\n• **Tetanus/Diphtheria** (every 10 years)\n\n⚠️ **Important**: Please consult with a healthcare provider for personalized vaccination recommendations based on your medical history.",
        'emergency': "For medical emergencies, please:\n\n🚨 **Call 14 (SAMU) or 15 (Civil Protection)** immediately\n\nFor non-emergency urgent care, you can:\n• Use our clinic finder to locate nearby emergency rooms\n• Look for clinics with \"ER Open\" status\n• Contact your primary care provider\n\nRemember: If you're experiencing chest pain, difficulty breathing, severe bleeding, or loss of consciousness, call emergency services immediately."
      },
      clinic: {
        'security': "The Security Medicine Suite provides comprehensive protection for your healthcare facility:\n\n**Available Scans:**\n• **Vulnerability Assessment** - Network and system security\n• **Compliance Check** - HIPAA/GDPR requirements\n• **Device Monitoring** - Medical equipment security\n\n**To configure a scan:**\n1. Go to Dashboard → Security Suite\n2. Select scan type and schedule\n3. Review results and recommendations\n\nWould you like me to explain any specific security feature?",
        'analytics': "Your analytics dashboard provides insights into:\n\n📊 **Key Metrics:**\n• Patient appointment trends\n• Satisfaction scores and reviews\n• Revenue and growth tracking\n• Wait time optimization\n\n📈 **Advanced Features (Pro/Enterprise):**\n• Predictive analytics\n• Patient retention forecasts\n• Comparative benchmarking\n\nTo access detailed analytics, navigate to Dashboard → Analytics. Need help interpreting any specific metrics?",
        'subscription': "**Current Subscription Management:**\n\n• **View current plan** and usage\n• **Upgrade/downgrade** options\n• **Billing history** and invoices\n• **Feature comparisons**\n\n**Available Plans:**\n• **Basic** ($99/mo) - Essential features\n• **Pro** ($199/mo) - Security + Analytics\n• **Enterprise** ($399/mo) - Full platform access\n\nWould you like to explore upgrade options or need help with billing?",
        'compliance': "**Compliance Reporting Features:**\n\n📋 **Available Reports:**\n• HIPAA compliance status\n• Data security audit logs\n• Patient privacy controls\n• Staff access monitoring\n\n**To generate reports:**\n1. Security Suite → Compliance\n2. Select report type and date range\n3. Download PDF or schedule automated reports\n\nNeed help with specific compliance requirements?"
      },
      supplier: {
        'tender': "**Bidding on Healthcare Tenders:**\n\n**Step-by-step process:**\n1. **Browse active tenders** in the Marketplace\n2. **Review requirements** and eligibility criteria\n3. **Prepare your proposal** with required documents\n4. **Submit application** before deadline\n5. **Track status** in your supplier dashboard\n\n**Required Documents:**\n• Company registration\n• Product certifications (FDA, CE, etc.)\n• Clinical trial data (if applicable)\n• Insurance certificates\n\nWould you like help with a specific tender or document requirements?",
        'upload': "**Document Upload Process:**\n\n📁 **Accepted File Types:**\n• PDF, DOC, DOCX for reports\n• JPG, PNG for certificates\n• XLS, XLSX for data sheets\n\n**Required Documents:**\n• **COA** (Certificate of Analysis)\n• **Clinical trial data**\n• **Safety reports**\n• **Regulatory approvals**\n\n**To upload:**\n1. Supplier Dashboard → Documents\n2. Select document type\n3. Upload and add description\n4. Submit for verification\n\nNeed help with specific document requirements?",
        'rfp': "**Active RFPs (Request for Proposals):**\n\nYou can find current opportunities by:\n\n🔍 **Filtering by:**\n• Drug category\n• Geographic region\n• Budget range\n• Deadline proximity\n\n📊 **Tender Categories:**\n• Medical equipment\n• Pharmaceuticals\n• Laboratory services\n• Medical supplies\n\nCheck the Marketplace section for the latest opportunities. Would you like help finding tenders in a specific category?",
        'contact': "**Contacting Healthcare Providers:**\n\n💬 **Communication Options:**\n• **Direct messaging** through platform\n• **Proposal submissions** for active tenders\n• **Follow-up messages** after applications\n\n**Best Practices:**\n• Be professional and concise\n• Include relevant certifications\n• Respond promptly to inquiries\n• Follow up appropriately\n\nRemember: Initial contact should be through tender applications or the messaging system. Need help crafting a professional message?"
      }
    };

    const roleResponses = responses[role as keyof typeof responses];
    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(roleResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Default responses
    const defaultResponses = {
      patient: "I'm here to help you with healthcare-related questions! You can ask me about finding clinics, booking appointments, health information, or navigating our platform. What would you like to know?",
      clinic: "I can assist you with platform features, security settings, analytics, subscription management, and compliance requirements. How can I help you today?",
      supplier: "I'm here to help you navigate the healthcare marketplace, understand tender processes, and connect with healthcare providers. What specific information do you need?"
    };

    return defaultResponses[role as keyof typeof defaultResponses] || defaultResponses.patient;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date(),
      userId: user?.id
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await simulateGeminiResponse(inputMessage, userRole || 'patient');
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: `Hello! I'm your HealthLand assistant. ${userRole ? `I see you're a ${userRole}` : 'I can help you'} with questions about our platform. How can I assist you today?`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen, userRole]);

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-3 focus:ring-primary/30 z-40 ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary text-white rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <Bot className="w-6 h-6" />
                <div>
                  <h3 className="font-jakarta font-semibold">HealthLand Assistant</h3>
                  {!isMinimized && (
                    <p className="text-xs opacity-90">
                      {userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Support` : 'General Support'}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-primary/20 rounded transition-colors"
                  aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-primary/20 rounded transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`p-2 rounded-full ${message.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                          {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={`p-3 rounded-2xl ${
                          message.role === 'user' 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-sm font-inter whitespace-pre-line">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-primary-100' : 'text-gray-500'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <div className="p-2 rounded-full bg-gray-100 text-gray-600">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {userRole && roleQuickReplies[userRole] && messages.length <= 1 && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-gray-500 font-inter mb-2">Quick actions:</p>
                    <div className="flex flex-wrap gap-2">
                      {roleQuickReplies[userRole].slice(0, 2).map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors font-inter"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter text-sm"
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputMessage.trim()}
                      className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GeminiChatbot;