import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Shield, Clock, Users, Zap, CheckCircle, Award, Star, ArrowRight, Play, Smartphone, Globe, Lock, Heart, Bell, BarChart3 } from 'lucide-react';

const FeaturesPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const mainFeatures = [
    {
      icon: Calendar,
      title: 'Smart Booking System',
      description: 'AI-powered appointment scheduling with real-time availability, automatic reminders, and seamless calendar integration.',
      color: 'from-blue-500 to-blue-600',
      stats: '10K+ bookings/month',
      benefits: ['Real-time availability', 'Automatic reminders', 'Calendar sync', 'Multi-provider booking'],
      details: 'Our intelligent booking system uses machine learning to optimize appointment scheduling, reducing wait times and improving patient satisfaction. Features include conflict detection, automated rescheduling, and smart time slot recommendations.',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    },
    {
      icon: MessageCircle,
      title: 'Secure Messaging',
      description: 'HIPAA-compliant chat with healthcare providers, encrypted file sharing, and complete consultation history.',
      color: 'from-green-500 to-green-600',
      stats: '99.9% uptime',
      benefits: ['End-to-end encryption', 'File sharing', 'Chat history', 'Multi-language support'],
      details: 'Communicate securely with your healthcare team through our encrypted messaging platform. Share medical documents, ask questions, and receive timely responses while maintaining complete privacy and compliance.',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Bank-level encryption, biometric authentication, comprehensive audit trails, and GDPR compliance.',
      color: 'from-primary to-primary/80',
      stats: 'Bank-level security',
      benefits: ['Biometric auth', 'Audit trails', 'GDPR compliant', 'Zero-trust architecture'],
      details: 'Your health data is protected with military-grade encryption and advanced security protocols. Our platform undergoes regular security audits and maintains the highest standards of data protection.',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    },
    {
      icon: Clock,
      title: '24/7 Emergency Access',
      description: 'Instant access to emergency services, real-time ER wait times, urgent care locator, and priority booking.',
      color: 'from-red-500 to-red-600',
      stats: '<2min response',
      benefits: ['Emergency access', 'Real-time wait times', 'Priority booking', 'GPS location services'],
      details: 'Get immediate access to emergency healthcare services with our 24/7 platform. View real-time emergency room wait times, locate the nearest urgent care facilities, and receive priority booking for critical situations.',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    },
    {
      icon: Users,
      title: 'Family Care Management',
      description: 'Manage health records for your entire family with shared calendars, notifications, and coordinated care.',
      color: 'from-purple-500 to-purple-600',
      stats: '5 family members',
      benefits: ['Family profiles', 'Shared calendars', 'Coordinated care', 'Parental controls'],
      details: 'Streamline healthcare for your entire family with centralized management tools. Coordinate appointments, share medical information securely, and ensure everyone receives the care they need.',
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    },
    {
      icon: Zap,
      title: 'AI Health Assistant',
      description: 'Personalized health insights, medication reminders, symptom checker, and smart recommendations powered by AI.',
      color: 'from-yellow-500 to-orange-500',
      stats: 'Smart recommendations',
      benefits: ['Health insights', 'Medication reminders', 'Symptom checker', 'Predictive analytics'],
      details: 'Our AI-powered health assistant provides personalized recommendations, tracks your health metrics, and helps you make informed decisions about your healthcare journey.',
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    }
  ];

  const additionalFeatures = [
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Optimized for mobile devices with offline capabilities and push notifications.'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Available in Arabic, French, and English with cultural adaptations.'
    },
    {
      icon: Lock,
      title: 'Privacy Controls',
      description: 'Granular privacy settings with complete control over your data sharing.'
    },
    {
      icon: Heart,
      title: 'Wellness Tracking',
      description: 'Comprehensive health monitoring with integration to wearable devices.'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Intelligent alerts for appointments, medications, and health reminders.'
    },
    {
      icon: BarChart3,
      title: 'Health Analytics',
      description: 'Detailed insights into your health trends and progress tracking.'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Ahmed Benali',
      role: 'Cardiologist',
      quote: 'HealthLand has revolutionized how I manage my practice. The security features give me confidence in handling sensitive patient data.',
      rating: 5
    },
    {
      name: 'Amina Boudiaf',
      role: 'Patient',
      quote: 'The family care management feature is incredible. I can easily coordinate healthcare for my entire family from one platform.',
      rating: 5
    },
    {
      name: 'Karim Mammeri',
      role: 'Clinic Administrator',
      quote: 'The analytics and reporting tools have helped us improve our operations significantly. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-inter font-semibold mb-6 shadow-sm">
              <Award className="w-4 h-4 mr-2" />
              Award-winning platform • Trusted by 50K+ patients
            </div>
            <h1 className="text-4xl md:text-6xl font-jakarta font-bold text-neutral-900 mb-6">
              Powerful Features for
              <span className="text-primary"> Modern Healthcare</span>
            </h1>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Discover how HealthLand's comprehensive feature set transforms the healthcare experience 
              for patients, providers, and administrators alike.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Feature Navigation */}
            <div className="space-y-6">
              <h2 className="text-3xl font-jakarta font-bold text-neutral-900 mb-8">
                Core Features
              </h2>
              {mainFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-primary/10 border-2 border-primary shadow-lg'
                      : 'bg-white border border-gray-200 hover:shadow-md'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-jakarta font-bold text-neutral-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 font-inter text-sm leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="flex items-center mt-3">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-inter font-medium text-gray-700">
                          {feature.stats}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature Details */}
            <div className="lg:sticky lg:top-24">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={mainFeatures[activeFeature].image}
                    alt={mainFeatures[activeFeature].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-jakarta font-bold mb-2">
                      {mainFeatures[activeFeature].title}
                    </h3>
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-gray-700 font-inter leading-relaxed mb-6 text-lg">
                    {mainFeatures[activeFeature].details}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-jakarta font-semibold text-neutral-900">Key Benefits:</h4>
                    {mainFeatures[activeFeature].benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="font-inter">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-primary text-white py-3 rounded-xl font-inter font-semibold hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-jakarta font-bold text-neutral-900 mb-6">
              Additional Features
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Explore more features designed to enhance your healthcare experience and provide 
              comprehensive support for all your medical needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="bg-primary/10 p-4 rounded-xl mb-6 w-fit group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-jakarta font-bold text-neutral-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-jakarta font-bold text-neutral-900 mb-6">
              Why Choose HealthLand?
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              See how HealthLand compares to traditional healthcare platforms and discover 
              what makes us the preferred choice for modern healthcare.
            </p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-jakarta font-bold text-neutral-900">Feature</th>
                    <th className="px-6 py-4 text-center font-jakarta font-bold text-primary">HealthLand</th>
                    <th className="px-6 py-4 text-center font-jakarta font-bold text-gray-600">Traditional Platforms</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-inter font-medium text-gray-900">Real-time Booking</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="w-6 h-6 bg-red-100 rounded-full mx-auto flex items-center justify-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-inter font-medium text-gray-900">AI-Powered Recommendations</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="w-6 h-6 bg-red-100 rounded-full mx-auto flex items-center justify-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-inter font-medium text-gray-900">Family Care Management</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full mx-auto flex items-center justify-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-inter font-medium text-gray-900">24/7 Emergency Access</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="w-6 h-6 bg-red-100 rounded-full mx-auto flex items-center justify-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-inter font-medium text-gray-900">Multi-language Support</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full mx-auto flex items-center justify-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-jakarta font-bold text-neutral-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Hear from healthcare professionals and patients who have experienced 
              the power of HealthLand's features firsthand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 font-inter leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-jakarta font-bold text-neutral-900">{testimonial.name}</div>
                  <div className="text-gray-600 font-inter text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-jakarta font-bold mb-4">
                Experience the Future of Healthcare
              </h3>
              <p className="text-lg md:text-xl font-inter mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of patients and healthcare providers who trust HealthLand 
                for their healthcare needs. Start your journey today.
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
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-inter font-semibold text-lg hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;