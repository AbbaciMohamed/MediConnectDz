import React, { useState } from 'react';

const demoDoctors = [
  { name: 'Dr. Sarah Benali', specialty: 'Cardiologist' },
  { name: 'Dr. Ahmed Boudiaf', specialty: 'General Practitioner' },
  { name: 'Dr. Lila Kacem', specialty: 'Pediatrician' }
];

const ChatPage: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  const handleSelect = (doc: any) => {
    setSelectedDoctor(doc);
    setMessages([{ from: 'doctor', text: `Hello, this is ${doc.name}. How can I help you?` }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'doctor', text: 'This is a demo reply from the doctor.' }]);
    }, 800);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 flex flex-col h-[70vh]">
        <h2 className="text-2xl font-bold mb-4 text-primary">Chat with Doctors</h2>
        {!selectedDoctor ? (
          <div>
            <p className="mb-4 text-gray-700">Select a doctor to start chatting:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoDoctors.map((doc, i) => (
                <button
                  key={i}
                  className="bg-primary/10 hover:bg-primary/20 rounded-xl p-4 text-left shadow transition"
                  onClick={() => handleSelect(doc)}
                >
                  <div className="font-semibold text-primary">{doc.name}</div>
                  <div className="text-gray-500 text-sm">{doc.specialty}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
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
                placeholder="Type your message..."
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button
                className="bg-primary text-white px-6 py-2 rounded-xl font-semibold hover:bg-primary-dark transition"
                onClick={handleSend}
              >Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
