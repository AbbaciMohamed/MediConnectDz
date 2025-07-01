import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Bell, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './auth/LoginModal';
// import logo from '../assets/logomain-removebg-preview.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Find Clinics', href: '/find-clinics' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Features', href: '/features' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              {/* Logo */}
              <motion.div 
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => handleNavigation('/')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* <img src={logo} alt="Logo" className="h-10 w-10" /> */}
                <span className="ml-4 text-2xl font-jakarta font-bold text-neutral-900">
                  HealthLand
                </span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`relative transition-colors duration-300 font-inter font-medium group ${
                    isActive(item.href) 
                      ? 'text-primary' 
                      : 'text-neutral-900 hover:text-primary'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              ))}
              
              <div className="flex items-center space-x-4 ml-8">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-inter font-semibold text-neutral-900">
                          {user.role === 'patient' && typeof user.profile === 'object' && 'firstName' in user.profile && 'lastName' in user.profile
                            ? `${(user.profile as { firstName: string; lastName: string }).firstName} ${(user.profile as { firstName: string; lastName: string }).lastName}`
                            : user.role === 'clinic' && typeof user.profile === 'object' && 'name' in user.profile
                            ? (user.profile as { name: string }).name
                            : user.role === 'doctor' && typeof user.profile === 'object' && 'firstName' in user.profile && 'lastName' in user.profile
                            ? `Dr. ${(user.profile as { firstName: string; lastName: string }).firstName} ${(user.profile as { firstName: string; lastName: string }).lastName}`
                            : user.email}
                        </div>
                        <div className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-inter font-medium w-fit">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => navigate('/profile')}
                      className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                    
                    <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <Bell className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200 font-inter font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="text-neutral-900 hover:text-primary transition-colors duration-200 font-inter font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
                    >
                      Login
                    </button>
                    <motion.button
                      onClick={() => {
                        navigate('/signup');
                        setIsMenuOpen(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-primary text-white px-6 py-4 rounded-xl font-inter font-semibold hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/30 text-center"
                    >
                      Sign Up Free
                    </motion.button>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 rounded-xl text-neutral-900 hover:bg-neutral-50 focus:outline-none focus:ring-3 focus:ring-primary/30 transition-colors duration-200"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden py-6 border-t border-gray-100 bg-white"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`text-left transition-colors duration-200 font-inter font-medium py-3 px-2 rounded-lg hover:bg-gray-50 ${
                      isActive(item.href) ? 'text-primary' : 'text-neutral-900 hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                  {user ? (
                    <>
                      <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-inter font-semibold text-neutral-900">
                            {user.role === 'patient' && typeof user.profile === 'object' && 'firstName' in user.profile && 'lastName' in user.profile
                              ? `${(user.profile as { firstName: string; lastName: string }).firstName} ${(user.profile as { firstName: string; lastName: string }).lastName}`
                              : user.role === 'clinic' && typeof user.profile === 'object' && 'name' in user.profile
                              ? (user.profile as { name: string }).name
                              : user.role === 'doctor' && typeof user.profile === 'object' && 'firstName' in user.profile && 'lastName' in user.profile
                              ? `Dr. ${(user.profile as { firstName: string; lastName: string }).firstName} ${(user.profile as { firstName: string; lastName: string }).lastName}`
                              : user.email}
                          </div>
                          <div className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-inter font-medium w-fit mt-1">
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          navigate('/profile');
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors duration-200 font-inter font-medium text-left py-3 px-2 rounded-lg hover:bg-gray-50"
                      >
                        <Settings className="w-5 h-5" />
                        <span>Profile Settings</span>
                      </button>
                      
                      <button className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors duration-200 font-inter font-medium text-left py-3 px-2 rounded-lg hover:bg-gray-50">
                        <Bell className="w-5 h-5" />
                        <span>Notifications</span>
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors duration-200 font-inter font-medium text-left py-3 px-2 rounded-lg hover:bg-gray-50"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setIsLoginModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="text-neutral-900 hover:text-primary transition-colors duration-200 font-inter font-medium text-left py-3 px-2 rounded-lg hover:bg-gray-50"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          navigate('/signup');
                          setIsMenuOpen(false);
                        }}
                        className="bg-primary text-white px-6 py-4 rounded-xl font-inter font-semibold hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/30 text-center"
                      >
                        Sign Up Free
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      )}
    </>
  );
};

export default Header;