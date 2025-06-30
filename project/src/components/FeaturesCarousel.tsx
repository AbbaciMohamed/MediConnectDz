import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle, Shield, Clock, ArrowRight, Star, Users, Zap, CheckCircle, Award } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Smart Booking',
    description: 'AI-powered appointment scheduling with real-time availability, automatic reminders, and seamless calendar integration.',
    link: '#booking',
    color: 'from-blue-500 to-blue-600',
    stats: '10K+ bookings/month',
    benefits: ['Real-time availability', 'Automatic reminders', 'Calendar sync']
  },
  {
    icon: MessageCircle,
    title: 'Secure Messaging',
    description: 'HIPAA-compliant chat with healthcare providers, encrypted file sharing, and complete consultation history.',
    link: '#messaging',
    color: 'from-green-500 to-green-600',
    stats: '99.9% uptime',
    benefits: ['End-to-end encryption', 'File sharing', 'Chat history']
  },
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'Bank-level encryption, biometric authentication, comprehensive audit trails, and GDPR compliance.',
    link: '#privacy',
    color: 'from-primary to-primary/80',
    stats: 'Bank-level security',
    benefits: ['Biometric auth', 'Audit trails', 'GDPR compliant']
  },
  {
    icon: Clock,
    title: '24/7 Emergency',
    description: 'Instant access to emergency services, real-time ER wait times, urgent care locator, and priority booking.',
    link: '#support',
    color: 'from-red-500 to-red-600',
    stats: '<2min response',
    benefits: ['Emergency access', 'Real-time wait times', 'Priority booking']
  },
  {
    icon: Users,
    title: 'Family Care',
    description: 'Manage health records for your entire family with shared calendars, notifications, and coordinated care.',
    link: '#family',
    color: 'from-purple-500 to-purple-600',
    stats: '5 family members',
    benefits: ['Family profiles', 'Shared calendars', 'Coordinated care']
  },
  {
    icon: Zap,
    title: 'AI Health Assistant',
    description: 'Personalized health insights, medication reminders, symptom checker, and smart recommendations powered by AI.',
    link: '#ai',
    color: 'from-yellow-500 to-orange-500',
    stats: 'Smart recommendations',
    benefits: ['Health insights', 'Medication reminders', 'Symptom checker']
  }
];

const FeaturesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const getVisibleFeatures = () => {
    const visible = [];
    for (let i = 0; i < visibleCards; i++) {
      visible.push(features[(currentIndex + i) % features.length]);
    }
    return visible;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-inter font-semibold mb-6 shadow-sm">
            <Award className="w-4 h-4 mr-2" />
            Award-winning platform • Trusted by 50K+ patients
          </div>
          <h2 className="text-4xl md:text-5xl font-jakarta font-bold text-neutral-900 mb-6">
            Why Choose HealthLand?
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
            Experience healthcare the modern way with our comprehensive platform designed for your convenience, 
            security, and peace of mind. Every feature is built with your health journey in mind.
          </p>
        </motion.div>

        {/* Desktop: Grid layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -12, scale: 1.02 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="group relative"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full relative overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Icon with gradient background */}
                <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl mb-6 w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-4 relative z-10">
                  <h3 className="text-xl font-jakarta font-bold text-neutral-900 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Benefits list */}
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="font-inter">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Stats badge */}
                  <div className="inline-flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-inter font-semibold">
                    <Star className="w-3 h-3 mr-1 text-yellow-500" />
                    {feature.stats}
                  </div>
                  
                  <a
                    href={feature.link}
                    className="inline-flex items-center text-primary font-inter font-semibold hover:text-primary/80 transition-colors duration-300 group-hover:translate-x-1 transform"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile & Tablet: Carousel */}
        <div className="lg:hidden">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`grid gap-6 ${visibleCards === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}
              >
                {getVisibleFeatures().map((feature, index) => (
                  <div
                    key={`${feature.title}-${currentIndex}-${index}`}
                    className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 relative overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-5 rounded-full blur-xl`}></div>
                    
                    <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl mb-4 w-fit shadow-md`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="space-y-3 relative z-10">
                      <h3 className="text-lg font-jakarta font-bold text-neutral-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 font-inter text-sm leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <div className="space-y-1">
                        {feature.benefits.slice(0, 2).map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            <span className="font-inter">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-inter font-medium">
                        <Star className="w-3 h-3 mr-1 text-yellow-500" />
                        {feature.stats}
                      </div>
                      
                      <a
                        href={feature.link}
                        className="inline-flex items-center text-primary font-inter font-semibold text-sm hover:text-primary/80 transition-colors duration-300"
                      >
                        Learn More
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-jakarta font-bold mb-4">
                Ready to Transform Your Healthcare Experience?
              </h3>
              <p className="text-lg md:text-xl font-inter mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of patients who trust HealthLand for their healthcare needs. 
                Start your journey to better health today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary px-8 py-4 rounded-xl font-inter font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
                >
                  Get Started Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-inter font-semibold text-lg hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  Watch Demo
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;