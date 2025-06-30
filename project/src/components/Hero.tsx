import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Play, Shield, Clock, Users, Star } from 'lucide-react';

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
    <section id="home" className="relative bg-gradient-to-br from-white via-primary/5 to-secondary/5 py-16 md:py-24 overflow-hidden">
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
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  onClick={scrollToSearch}
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
                
                <motion.button
                  onClick={scrollToHowItWorks}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-primary font-inter font-semibold text-lg hover:text-primary/80 transition-colors duration-300 py-4 px-6 rounded-xl hover:bg-primary/5 flex items-center justify-center group border-2 border-primary/20 hover:border-primary/40"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  How It Works
                </motion.button>
              </div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
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
                transition={{ duration: 0.6, delay: 0.7 }}
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
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              {/* Main illustration container */}
              <div className="bg-gradient-to-br from-white via-primary/10 to-secondary/10 rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden shadow-2xl border border-gray-100">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary rounded-full"></div>
                  <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-secondary rounded-full"></div>
                  <div className="absolute top-1/2 left-5 w-12 h-12 border-2 border-primary rounded-full"></div>
                  <div className="absolute top-1/4 right-1/4 w-8 h-8 border-2 border-secondary rounded-full"></div>
                </div>

                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Phone mockup */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="relative bg-white rounded-[2.5rem] shadow-2xl w-64 h-[28rem] p-3 z-10 border-8 border-gray-100"
                  >
                    <div className="bg-gradient-to-b from-primary via-primary to-primary/90 rounded-[2rem] h-full flex flex-col relative overflow-hidden">
                      {/* Phone screen content */}
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full"></div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center text-white px-6">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="mb-6"
                        >
                          <MapPin className="w-20 h-20 mx-auto text-white drop-shadow-lg" />
                        </motion.div>
                        
                        <div className="text-center mb-8">
                          <div className="text-2xl font-jakarta font-bold mb-2">HealthLand</div>
                          <div className="text-sm opacity-90 font-inter">Find Clinics Nearby</div>
                        </div>
                        
                        {/* Mock search results */}
                        <div className="space-y-3 w-full">
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-sm"
                          >
                            <div className="font-semibold mb-1">Algiers Medical Center</div>
                            <div className="opacity-80 text-xs flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              0.5 km • Open now
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-sm"
                          >
                            <div className="font-semibold mb-1">Cardiology Clinic</div>
                            <div className="opacity-80 text-xs flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              1.2 km • Available
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.4, duration: 0.5 }}
                            className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-sm"
                          >
                            <div className="font-semibold mb-1">Emergency Care</div>
                            <div className="opacity-80 text-xs flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              2.1 km • 24/7
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Floating location pins */}
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 0 
                    }}
                    className="absolute top-1/4 left-1/4 bg-primary text-white p-4 rounded-2xl shadow-xl z-20 border-4 border-white"
                  >
                    <MapPin className="w-6 h-6" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ 
                      y: [0, -12, 0],
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ 
                      duration: 3.5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 0.5 
                    }}
                    className="absolute top-1/3 right-1/4 bg-secondary text-white p-4 rounded-2xl shadow-xl z-20 border-4 border-white"
                  >
                    <MapPin className="w-6 h-6" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ 
                      y: [0, -18, 0],
                      rotate: [0, 3, -3, 0]
                    }}
                    transition={{ 
                      duration: 4.5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 1 
                    }}
                    className="absolute bottom-1/3 left-1/3 bg-green-500 text-white p-4 rounded-2xl shadow-xl z-20 border-4 border-white"
                  >
                    <MapPin className="w-6 h-6" />
                  </motion.div>

                  {/* Pulse rings */}
                  <motion.div
                    animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                    className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-primary rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 2.5, 1], opacity: [0.2, 0, 0.2] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                    className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-secondary rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 2.2, 1], opacity: [0.25, 0, 0.25] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1 }}
                    className="absolute bottom-1/3 left-1/3 w-16 h-16 border-2 border-green-500 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;