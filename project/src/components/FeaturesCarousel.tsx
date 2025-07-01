import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle, Shield, Clock, Users, Zap, CheckCircle, HeartPulse, Pill, Stethoscope, Activity, Brain } from 'lucide-react';

const FeaturesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features = [
    {
      icon: Calendar,
      title: 'Smart Booking',
      description: 'AI-powered appointment scheduling with real-time availability and automatic reminders.',
      stats: '10K+ bookings/month',
      benefits: ['Real-time availability', 'Automatic reminders', 'Calendar sync'],
      color: '#3b82f6'
    },
    {
      icon: MessageCircle,
      title: 'Secure Messaging',
      description: 'HIPAA-compliant chat with healthcare providers and encrypted file sharing.',
      stats: '99.9% uptime',
      benefits: ['End-to-end encryption', 'File sharing', 'Chat history'],
      color: '#14b8a6'
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Bank-level encryption, biometric authentication, and GDPR compliance.',
      stats: 'Bank-level security',
      benefits: ['Biometric auth', 'Audit trails', 'GDPR compliant'],
      color: '#6366f1'
    },
    {
      icon: Clock,
      title: '24/7 Emergency',
      description: 'Instant access to emergency services and real-time ER wait times.',
      stats: '<2min response',
      benefits: ['Emergency access', 'Real-time wait times', 'Priority booking'],
      color: '#f43f5e'
    },
    {
      icon: Users,
      title: 'Family Care',
      description: 'Manage health records for your entire family with shared calendars.',
      stats: '5 family members',
      benefits: ['Family profiles', 'Shared calendars', 'Coordinated care'],
      color: '#8b5cf6'
    },
    {
      icon: Zap,
      title: 'AI Health Assistant',
      description: 'Personalized health insights and medication reminders powered by AI.',
      stats: 'Smart recommendations',
      benefits: ['Health insights', 'Medication reminders', 'Symptom checker'],
      color: '#06b6d4'
    }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % features.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const nextFeature = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const prevFeature = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              backgroundColor: features[activeIndex].color,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Medical symbols floating */}
      <div className="absolute top-1/4 left-1/5 animate-float">
        <HeartPulse className="w-10 h-10 text-blue-400/30" />
      </div>
      <div className="absolute top-1/3 right-1/3 animate-float-delay">
        <Pill className="w-8 h-8 text-teal-400/30" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 animate-float">
        <Stethoscope className="w-12 h-12 text-indigo-400/30" />
      </div>
      <div className="absolute top-1/2 right-1/5 animate-float-delay">
        <Activity className="w-9 h-9 text-rose-400/30" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-sm">
            <div className="w-4 h-4 mr-2 rounded-full bg-blue-600 animate-pulse" />
            Award-winning platform • Trusted by 50K+ patients
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transform Your <span className="text-blue-600">Healthcare Experience</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform combines cutting-edge technology with compassionate care to deliver an unparalleled healthcare journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Visual representation */}
          <div className="relative h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  {/* Main circle */}
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${features[activeIndex].color}20` }}
                  >
                    <div className="w-44 h-44 rounded-full flex items-center justify-center" 
                         style={{ backgroundColor: `${features[activeIndex].color}40` }}>
                      <div className="w-32 h-32 rounded-full flex items-center justify-center" 
                           style={{ backgroundColor: `${features[activeIndex].color}60` }}>
                        <div className="w-20 h-20 rounded-full flex items-center justify-center" 
                             style={{ backgroundColor: features[activeIndex].color }}>
                          {(() => {
                            const Icon = features[activeIndex].icon;
                            return <Icon className="w-10 h-10 text-white" />;
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  {features[activeIndex].benefits.map((benefit, index) => {
                    const angle = (index * 360 / features[activeIndex].benefits.length) * (Math.PI / 180);
                    const radius = 180;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          x: x,
                          y: y,
                        }}
                        transition={{ 
                          duration: 0.7,
                          delay: index * 0.1 + 0.3
                        }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="bg-white shadow-xl rounded-xl p-4 w-40 text-center">
                          <CheckCircle className="w-5 h-5 mx-auto text-green-500 mb-2" />
                          <p className="text-sm font-medium text-gray-700">{benefit}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Right side - Content */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-100"
              >
                <div className="flex items-start mb-6">
                  <div 
                    className="p-4 rounded-xl mr-4"
                    style={{ backgroundColor: `${features[activeIndex].color}20` }}
                  >
                    {(() => {
                      const Icon = features[activeIndex].icon;
                      return <Icon className="w-8 h-8" style={{ color: features[activeIndex].color }} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {features[activeIndex].title}
                    </h3>
                    <div className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: features[activeIndex].color }}></div>
                      {features[activeIndex].stats}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-8">
                  {features[activeIndex].description}
                </p>
                
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="h-0.5 flex-1 bg-gray-200"></div>
                    <span className="px-4 text-gray-500 font-medium">Key Benefits</span>
                    <div className="h-0.5 flex-1 bg-gray-200"></div>
                  </div>
                  
                  <ul className="space-y-3">
                    {features[activeIndex].benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                          style={{ backgroundColor: `${features[activeIndex].color}20` }}
                        >
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: features[activeIndex].color }}></div>
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity duration-300 shadow-lg"
                  style={{ boxShadow: `0 10px 25px -5px ${features[activeIndex].color}50` }}
                >
                  Learn More
                </button>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button 
                onClick={prevFeature}
                className="bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-blue-600 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    style={{
                      backgroundColor: index === activeIndex ? features[activeIndex].color : undefined
                    }}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextFeature}
                className="bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesCarousel;