import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { OrgProvider } from './contexts/OrgContext';
import Header from './components/Header';
import Footer from './components/Footer';
import GeminiChatbot from './components/chat/GeminiChatbot';
import ProfileRouter from './components/profile/ProfileRouter';
import DashboardPage from './pages/DashboardPage';
import ChatbotPage from './pages/ChatbotPage';
import ChatPage from './pages/ChatPage';
import ClinicsPage from './pages/ClinicsPage';
import ClinicSearchPage from './pages/ClinicSearchPage';
import MarketplacePage from './pages/MarketplacePage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import TestimonialsPage from './pages/TestimonialsPage';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';
import ResellerLandingPage from './pages/ResellerLandingPage';
import NotificationsPage from './pages/NotificationsPage';

const AppContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Handler for the Hero button
  const handleFindClinicNearMe = () => {
    navigate('/find-clinics', { state: { triggerLocation: true } });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            {/* Home page content only, no GeminiChatbot here */}
            <main>
              <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Welcome to HealthLand</h1>
                <p className="mb-6">Connect with trusted clinics, chat with doctors, and use our AI chatbot for instant health answers.</p>
              </div>
            </main>
          </>
        } />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/clinics" element={<ClinicsPage />} />
        <Route path="/find-clinics" element={<ClinicSearchPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        <Route path="/partners" element={<ResellerLandingPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfileRouter />} />
        {/* Fallback route for 404 */}
        <Route path="*" element={<div className="p-8 text-center">404 - Page Not Found</div>} />
      </Routes>
      <Footer />
      <GeminiChatbot />
    </div>
  );
};

function App() {
  return (
    <OrgProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </OrgProvider>
  );
}

export default App;