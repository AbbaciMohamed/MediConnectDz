import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle, Shield, Clock, Users, Zap, X, HeartPulse, Pill, Stethoscope, Activity, CheckCircle, Star, ArrowRight } from 'lucide-react';

const FeaturesShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

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
      color: 'bg-blue-500',
      detailedDescription: 'Our AI-powered booking system analyzes your schedule and preferences to find the perfect appointment time. It integrates with healthcare providers\' systems to show real-time availability, sends automatic reminders to reduce no-shows, and syncs with your calendar seamlessly.',
      keyFeatures: [
        'Intelligent time slot recommendations',
        'Automated SMS/email reminders',
        'Two-way calendar sync',
        'Waitlist management',
        'Rescheduling with one click'
      ],
      testimonial: 'Smart Booking saved me hours of phone calls and reduced my missed appointments to zero!'
    },
    {
      icon: MessageCircle,
      title: 'Secure Messaging',
      description: 'HIPAA-compliant chat with healthcare providers and encrypted file sharing.',
      benefits: ['End-to-end encryption', 'File sharing', 'Chat history'],
      color: 'bg-teal-500',
      detailedDescription: 'Communicate with your healthcare team securely through our encrypted messaging platform. All messages are HIPAA-compliant with end-to-end encryption, allowing you to share sensitive documents and medical records safely.',
      keyFeatures: [
        'Military-grade encryption',
        'Secure document sharing',
        'Provider-to-patient messaging',
        'Message history archive',
        'Read receipts and delivery confirmations'
      ],
      testimonial: 'Being able to message my doctor directly and share test results securely has transformed my healthcare experience.'
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Bank-level encryption, biometric authentication, and GDPR compliance.',
      benefits: ['Biometric auth', 'Audit trails', 'GDPR compliant'],
      color: 'bg-indigo-500',
      detailedDescription: 'Your health data is protected with bank-level security measures. Our platform uses biometric authentication, comprehensive audit trails, and complies with all GDPR regulations to ensure your information remains private and secure.',
      keyFeatures: [
        'Facial recognition and fingerprint login',
        'Real-time security alerts',
        'Data encryption at rest and in transit',
        'Regular security audits',
        'Compliance with global privacy standards'
      ],
      testimonial: 'I feel completely safe knowing my sensitive health information is protected by such robust security measures.'
    },
    {
      icon: Clock,
      title: '24/7 Emergency',
      description: 'Instant access to emergency services and real-time ER wait times.',
      benefits: ['Emergency access', 'Real-time wait times', 'Priority booking'],
      color: 'bg-rose-500',
      detailedDescription: 'Get immediate help when you need it most with our 24/7 emergency services. View real-time emergency room wait times, find the nearest urgent care facilities, and receive priority booking for critical situations.',
      keyFeatures: [
        'Live ER wait time monitoring',
        'Urgent care locator',
        'Emergency contact routing',
        'Priority appointment scheduling',
        'Critical symptom checker'
      ],
      testimonial: 'When I had a medical emergency, this feature helped me find the nearest ER with the shortest wait time - it was a lifesaver!'
    },
    {
      icon: Users,
      title: 'Family Care',
      description: 'Manage health records for your entire family with shared calendars.',
      benefits: ['Family profiles', 'Shared calendars', 'Coordinated care'],
      color: 'bg-purple-500',
      detailedDescription: 'Coordinate healthcare for your entire family in one place. Create individual profiles, manage appointments with a shared calendar, track medications, and ensure everyone receives coordinated care.',
      keyFeatures: [
        'Centralized family health dashboard',
        'Shared medication tracking',
        'Appointment coordination',
        'Vaccination records',
        'Permission-based access control'
      ],
      testimonial: 'Managing my family\'s healthcare was overwhelming until I started using Family Care - now everything is organized in one place.'
    },
    {
      icon: Zap,
      title: 'AI Health Assistant',
      description: 'Personalized health insights and medication reminders powered by AI.',
      benefits: ['Health insights', 'Medication reminders', 'Symptom checker'],
      color: 'bg-cyan-500',
      detailedDescription: 'Our AI-powered health assistant provides personalized insights based on your health data. Receive smart medication reminders, analyze symptoms, and get recommendations for maintaining optimal health.',
      keyFeatures: [
        'Personalized health recommendations',
        'Smart medication scheduling',
        'Symptom analysis',
        'Health trend tracking',
        'Wellness goal setting'
      ],
      testimonial: 'The AI assistant reminds me to take my medications and has helped me identify patterns in my health I never noticed before.'
    }
  ];

  const nextFeature = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const prevFeature = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length);
  };

  const openPopup = (index) => {
    setExpandedFeature(features[index]);
    setPopupVisible(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
  };

  const closePopup = () => {
    setPopupVisible(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Auto-rotate features every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!popupVisible) {
        nextFeature();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [popupVisible]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              backgroundColor: '#3b82f6',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col border border-gray-100 transition-all duration-300 group-hover:shadow-xl cursor-pointer" onClick={() => openPopup(index)}>
                <div className={`${feature.color} p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-5 flex-grow">{feature.description}</p>
                
                <div className="space-y-3 mb-6">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <button className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 cursor-pointer" onClick={() => openPopup(activeIndex)}
              >
                <div className={`${features[activeIndex].color} p-4 rounded-xl w-fit mb-6`}>
                  {(() => {
                    const Icon = features[activeIndex].icon;
                    return <Icon className="w-8 h-8 text-white" />;
                  })()}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {features[activeIndex].title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {features[activeIndex].description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {features[activeIndex].benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity duration-300 shadow-lg">
                  Learn More
                </button>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation arrows */}
            <button 
              onClick={prevFeature}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg border border-gray-200 z-20 hover:bg-blue-50 transition-colors"
              aria-label="Previous feature"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextFeature}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg border border-gray-200 z-20 hover:bg-blue-50 transition-colors"
              aria-label="Next feature"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-16"
        >
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-blue-500/20">
            Get Started Today
          </button>
          <p className="mt-4 text-gray-600">
            Join thousands of patients experiencing better healthcare
          </p>
        </motion.div>
      </div>

      {/* Feature Detail Popup */}
      <AnimatePresence>
        {popupVisible && expandedFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className={`${expandedFeature.color} p-3 rounded-xl mr-4`}>
                      <expandedFeature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{expandedFeature.title}</h3>
                      <div className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mt-2">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {expandedFeature.stats}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={closePopup}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Detailed Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Overview</h4>
                    <p className="text-gray-600 mb-6">{expandedFeature.detailedDescription}</p>
                    
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Key Features</h4>
                    <ul className="space-y-3 mb-8">
                      {expandedFeature.keyFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="bg-blue-100 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                        <div className="ml-4">
                          <p className="text-gray-600 italic">"{expandedFeature.testimonial}"</p>
                          <p className="text-sm text-gray-500 mt-2">- Sarah K., HealthLand User</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">How It Works</h4>
                      <div className="space-y-4">
                        <div className="flex">
                          <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</div>
                          <p className="text-gray-600">Sign up for a HealthLand account and complete your profile</p>
                        </div>
                        <div className="flex">
                          <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</div>
                          <p className="text-gray-600">Connect with healthcare providers in our network</p>
                        </div>
                        <div className="flex">
                          <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</div>
                          <p className="text-gray-600">Start using the {expandedFeature.title} feature immediately</p>
                        </div>
                        <div className="flex">
                          <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">4</div>
                          <p className="text-gray-600">Enjoy seamless healthcare management tailored to your needs</p>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Benefits</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {expandedFeature.benefits.map((benefit, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center">
                          <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: expandedFeature.color.replace('bg-', '#') }}></div>
                          <span className="text-gray-700 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={closePopup}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium mr-4 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-300">
                    Try This Feature
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeaturesShowcase;