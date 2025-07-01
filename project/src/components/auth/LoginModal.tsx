import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import MultiStepRegistration from './MultiStepRegistration';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChatbotModal from '../chat/ChatbotModal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isLogin) {
      setShowRegistration(true);
      return;
    }
    setIsLoading(true);
    try {
      await login(formData.email, formData.password, rememberMe);
      onClose();
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || 'Login failed');
      } else {
        setError('Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
    setIsLogin(true);
  };

  if (showRegistration) {
    return <MultiStepRegistration isOpen={true} onClose={handleCloseRegistration} />;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md"
          >
            <div className="p-8">
              {/* Chatbot Button */}
              <button
                onClick={() => setIsChatbotOpen(true)}
                className="absolute top-4 right-16 bg-primary text-white px-3 py-1 rounded-lg font-inter text-sm shadow hover:bg-primary/90 transition-colors"
                type="button"
              >
                Chatbot
              </button>

              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-jakarta font-bold text-neutral-900">
                    {isLogin ? 'Welcome Back' : 'Join HealthLand'}
                  </h2>
                  <p className="text-gray-600 font-inter mt-2">
                    {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
                  </p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Close">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {error && (
                <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {isLogin && (
                  <div>
                    <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <label htmlFor="rememberMe" className="ml-2 text-sm font-inter text-gray-600">
                        Remember me for 30 days
                      </label>
                    </div>
                    <button type="button" className="text-sm font-inter text-primary hover:underline">
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-4 rounded-xl font-inter font-semibold hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-3 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Please wait...
                    </div>
                  ) : (
                    isLogin ? 'Sign In' : 'Continue to Registration'
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData({ email: '', password: '' });
                  }}
                  className="text-primary font-inter font-medium hover:underline"
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
              </div>

              {isLogin && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-inter font-semibold text-gray-900 mb-2">Demo Accounts</h4>
                  <div className="text-sm text-gray-600 font-inter space-y-1">
                    <p><strong>Patient:</strong> patient@demo.com / password123</p>
                    <p><strong>Clinic:</strong> clinic@demo.com / password123</p>
                    <p><strong>Supplier:</strong> supplier@demo.com / password123</p>
                  </div>
                </div>
              )}
            </div>
            {/* Chatbot Modal */}
            <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
