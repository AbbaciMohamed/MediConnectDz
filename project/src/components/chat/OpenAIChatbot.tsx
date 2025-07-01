import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, User, Bot, Minimize2, Maximize2 } from 'lucide-react';
import { ChatMessage } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const OpenAIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState<'patient' | 'clinic' | 'supplier' | 'doctor' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [error, setError] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user) {
      setUserRole(user.role as 'patient' | 'clinic' | 'supplier' | 'doctor');
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
    ],
    doctor: [
      'View my appointments',
      'Patient history',
      'Write a prescription',
      'Consult with another doctor'
    ]
  };

  const getSystemPrompt = (role: string) => {
    const prompts = {
      patient: "You are a helpful healthcare assistant for patients. Help them find clinics, book appointments, understand medical procedures, and provide general health information. Always recommend consulting with healthcare professionals for medical advice.",
      clinic: "You are a healthcare platform assistant for clinic administrators. Help them with platform features, security settings, analytics, subscription management, and compliance requirements.",
      supplier: "You are a marketplace assistant for pharmaceutical suppliers. Help them understand the tender process, upload documents, find relevant opportunities, and connect with healthcare providers.",
      doctor: "You are a digital assistant for doctors. Help them manage appointments, access patient records, and provide general platform support."
    };
    return prompts[role as keyof typeof prompts] || prompts.patient;
  };

  const sendMessage = async () => {
    if (isLoading) return; // Prevent double submit
    const trimmed = inputMessage.trim();
    if (!trimmed) return;
    setIsLoading(true);
    setError('');
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      content: trimmed,
      role: 'user',
      timestamp: new Date(),
      userId: user?.id
    };
    setMessages(prev => [...prev, userMsg]);
    try {
      const res = await fetch('/api/clinics/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed })
      });
      if (!res.ok) {
        setError('Server error: ' + res.statusText);
        console.error('Error:', res.statusText);
        setIsLoading(false);
        setInputMessage('');
        return;
      }
      let data;
      try {
        data = await res.json();
      } catch (e) {
        setError('Server error: invalid response');
        console.error('Error: invalid response');
        setIsLoading(false);
        setInputMessage('');
        return;
      }
      let botContent = "I'm sorry, I'm having trouble responding right now. Please try again in a moment.";
      // Match backend: { reply: ... } or { error: ... }
      if (data && data.reply) {
        botContent = data.reply;
        console.log('Success:', botContent);
      } else if (data && data.error) {
        botContent = `Server error: ${data.error}`;
        console.error('Error:', data.error);
      }
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: botContent,
        role: 'assistant',
        timestamp: new Date(),
        userId: user?.id
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError('Failed to get reply.');
      console.error('Failed to get reply:', err);
    }
    setIsLoading(false);
    setInputMessage('');
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
            className={`fixed bottom-1 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 ${
              isMinimized ? 'w-48 h-10' : 'w-64 h-[400px]'
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
                          <Bot className="w-4 h-4 animate-spin" />
                        </div>
                        <div className="p-3 rounded-2xl bg-gray-100 text-gray-800">
                          <p className="text-sm font-inter">Thinking...</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form
                  className="flex items-center p-4 border-t border-gray-100"
                  onSubmit={e => {
                    // Remove all blockers and always call sendMessage
                    e.preventDefault();
                    sendMessage();
                  }}
                >
                  <input
                    type="text"
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-primary/30 font-inter"
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white rounded-full p-3 hover:bg-primary/90 transition-colors disabled:opacity-50"
                    disabled={isLoading || !inputMessage.trim()}
                    title="Send message"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
                {error && <div className="text-red-600 text-sm px-4 pb-2">{error}</div>}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OpenAIChatbot; 