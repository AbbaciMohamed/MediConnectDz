import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import PersonalWindow from '../components/user/PersonalWindow';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const displayName = user?.profile?.firstName || user?.name || user?.email || 'User';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-white p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 mt-10">
        <h1 className="text-3xl font-bold mb-4">Welcome, {displayName}!</h1>
        <p className="mb-6 text-gray-700">This is your personalized dashboard. Explore the features below:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/chatbot" className="block bg-primary/10 hover:bg-primary/20 rounded-xl p-6 text-center shadow transition">
            <span className="text-xl font-semibold text-primary">AI Chatbot</span>
            <p className="text-gray-500 mt-2">Ask health questions, get instant answers.</p>
          </Link>
          <Link to="/chat" className="block bg-primary/10 hover:bg-primary/20 rounded-xl p-6 text-center shadow transition">
            <span className="text-xl font-semibold text-primary">Chat with Doctors</span>
            <p className="text-gray-500 mt-2">Start a secure conversation with a doctor or clinic.</p>
          </Link>
          <Link to="/clinics" className="block bg-primary/10 hover:bg-primary/20 rounded-xl p-6 text-center shadow transition">
            <span className="text-xl font-semibold text-primary">Find Clinics</span>
            <p className="text-gray-500 mt-2">Search and connect with clinics near you.</p>
          </Link>
          <Link to="/profile" className="block bg-primary/10 hover:bg-primary/20 rounded-xl p-6 text-center shadow transition">
            <span className="text-xl font-semibold text-primary">My Profile</span>
            <p className="text-gray-500 mt-2">View and update your personal information.</p>
          </Link>
        </div>
        <PersonalWindow />
      </div>
    </div>
  );
};

export default DashboardPage;
