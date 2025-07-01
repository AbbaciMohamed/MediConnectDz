import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserChat = ({ otherUserId, chatType }) => {
  const { user } = useAuth();
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const getRoom = async () => {
      const res = await fetch('/api/chat/room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId1: user.userId, userId2: otherUserId, type: chatType })
      });
      const data = await res.json();
      setRoomId(data._id);
    };
    getRoom();
  }, [user, otherUserId, chatType]);

  useEffect(() => {
    if (!roomId) return;
    const fetchMessages = async () => {
      const res = await fetch(`/api/chat/messages/${roomId}`);
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !roomId) return;
    await fetch('/api/chat/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId, senderId: user.userId, content: input })
    });
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 w-96 h-[600px] flex flex-col">
      <div className="p-4 border-b font-bold">Chat</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div key={msg._id} className={`flex ${msg.senderId === user.userId ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 rounded-xl ${msg.senderId === user.userId ? 'bg-primary text-white' : 'bg-gray-200 text-gray-900'}`}>{msg.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t flex">
        <input
          className="flex-1 border rounded-xl px-4 py-2 mr-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
          placeholder="Type a message..."
        />
        <button className="bg-primary text-white px-4 py-2 rounded-xl" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default UserChat; 