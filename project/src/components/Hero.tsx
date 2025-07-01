import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Shield, Clock, Users } from 'lucide-react';
import logo from '../assets/Logo.png';

const Hero = () => {
  const scrollToSearch = () => {
    const searchSection = document.getElementById('clinic-search');
    searchSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    howItWorksSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-white via-primary/5 to-secondary/5 py-10 md:py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left content - 60% on desktop */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-inter font-semibold shadow-sm"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Live ER Status • Real-time Availability
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-jakarta font-bold text-neutral-900 leading-tight">
                  Your Health,{' '}
                  <span className="relative text-primary">
                    Wherever You Are
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="absolute bottom-2 left-0 right-0 h-2 bg-primary/20 rounded-full origin-left"
                    />
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 font-inter max-w-2xl leading-relaxed">
                  Connect with trusted clinics and specialists across Algeria—fast, secure, and free. 
                  Book appointments, access emergency services, and manage your health journey with confidence.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <motion.button
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-primary text-white px-8 py-4 rounded-xl font-inter font-semibold text-lg hover:bg-primary/90 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30 flex items-center justify-center group shadow-xl hover:shadow-2xl"
                  aria-label="Find a clinic near your location"
                >
                  <MapPin className="w-5 h-5 mr-3" />
                  Find a Clinic Near Me
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
              >
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-jakarta font-bold text-neutral-900 mb-1">500+</div>
                  <div className="text-sm text-gray-600 font-inter">Verified Clinics</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-jakarta font-bold text-neutral-900 mb-1">50K+</div>
                  <div className="text-sm text-gray-600 font-inter">Happy Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-jakarta font-bold text-neutral-900 mb-1">24/7</div>
                  <div className="text-sm text-gray-600 font-inter">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-jakarta font-bold text-neutral-900 mb-1">4.9★</div>
                  <div className="text-sm text-gray-600 font-inter">Rating</div>
                </div>
              </motion.div>

              {/* Feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                  <Shield className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm font-inter font-medium text-gray-700">HIPAA Compliant</span>
                </div>
                <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                  <Clock className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm font-inter font-medium text-gray-700">Instant Booking</span>
                </div>
                <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                  <Users className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm font-inter font-medium text-gray-700">Family Care</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right illustration - 40% on desktop */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <motion.img
              src={logo}
              alt="HealthLand Logo"
              className="h-40 md:h-56 lg:h-64 w-auto object-contain rounded-full shadow-xl"
              initial={{ y: 0, scale: 1, rotate: 0, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)' }}
              animate={{
                y: [0, -18, 0, 18, 0],
                scale: [1, 1.07, 1, 0.97, 1],
                rotate: [0, 2, -2, 0],
                boxShadow: [
                  '0 8px 32px 0 rgba(0,0,0,0.12)',
                  '0 16px 40px 0 rgba(0,0,0,0.16)',
                  '0 8px 32px 0 rgba(0,0,0,0.12)'
                ]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;