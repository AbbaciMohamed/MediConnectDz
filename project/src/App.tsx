import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { OrgProvider } from './contexts/OrgContext';
import Header from './components/Header';
import Footer from './components/Footer';
import GeminiChatbot from './components/chat/GeminiChatbot';
import ProfileRouter from './components/profile/ProfileRouter';

// Home page components
import Hero from './components/Hero';
import FeaturesCarousel from './components/FeaturesCarousel';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';

// Independent pages
import ClinicSearchPage from './pages/ClinicSearchPage';
import MarketplacePage from './pages/MarketplacePage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import TestimonialsPage from './pages/TestimonialsPage';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';
import ResellerLandingPage from './pages/ResellerLandingPage';
import NotificationsPage from './pages/NotificationsPage';

const HomePage = () => (
  <main>
    <Hero />
    <FeaturesCarousel />
    <HowItWorks />
    <Testimonials />
  </main>
);

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
        {/* If user is logged in, show profile as default */}
        <Route 
          path="/" 
          element={user ? <ProfileRouter /> : <Hero onFindClinicNearMe={handleFindClinicNearMe} />} 
        />
        
        {/* Independent pages */}
        <Route path="/find-clinics" element={<ClinicSearchPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        <Route path="/partners" element={<ResellerLandingPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        
        {/* Profile routes */}
        <Route path="/profile" element={<ProfileRouter />} />
        <Route path="/dashboard" element={<ProfileRouter />} />
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