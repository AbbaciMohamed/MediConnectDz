import React, { useState } from 'react';

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! I am your AI health assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'This is a demo answer. (Integrate with backend for real answers.)' }]);
    }, 800);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 flex flex-col h-[70vh]">
        <h2 className="text-2xl font-bold mb-4 text-primary">AI Chatbot</h2>
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2 rounded-2xl max-w-[70%] ${msg.from === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'}`}>{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your question..."
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button
            className="bg-primary text-white px-6 py-2 rounded-xl font-semibold hover:bg-primary-dark transition"
            onClick={handleSend}
          >Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
