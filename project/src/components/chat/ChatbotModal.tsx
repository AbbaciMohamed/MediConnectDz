import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    // Simulate bot reply
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: "I'm just a demo bot!" }]);
    }, 600);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm flex flex-col h-[500px]">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold text-lg">Chatbot</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Close chatbot">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2 rounded-xl max-w-[80%] ${msg.from === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'}`}>{msg.text}</div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Type your message..."
          />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotModal;
