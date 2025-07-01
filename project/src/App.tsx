import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import GeminiChatbot from './components/chat/GeminiChatbot';
import ProfileRouter from './components/profile/ProfileRouter';
import SignUpPage from './components/auth/SignUpPage';

// Home page components
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';

// Independent pages
import ClinicSearchPage from './pages/ClinicSearchPage';
import MarketplacePage from './pages/MarketplacePage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import TestimonialsPage from './pages/TestimonialsPage';

const HomePage = () => (
  <main>
    <Hero />
    <HowItWorks />
    <Testimonials />
  </main>
);

const AppContent = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Routes>
        {/* If user is logged in, show profile as default */}
        <Route 
          path="/" 
          element={user ? <ProfileRouter /> : <HomePage />} 
        />
        
        {/* Independent pages */}
        <Route path="/find-clinics" element={<ClinicSearchPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        
        {/* Profile routes */}
        <Route path="/profile" element={<ProfileRouter />} />
        <Route path="/dashboard" element={<ProfileRouter />} />
        {/* Sign Up route */}
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <Footer />
      <GeminiChatbot />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;