import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Search, Calendar, Heart, MessageCircle, Shield, CheckCircle } from 'lucide-react';

const HowItWorksPage = ({ onRegister }: { onRegister?: () => void }) => {
  const [activeRole, setActiveRole] = useState('patient');
  const [activeStep, setActiveStep] = useState(0);

  const roles = [
    { id: 'patient', label: 'For Patients', icon: Heart },
    { id: 'provider', label: 'For Healthcare Providers', icon: Shield },
    { id: 'supplier', label: 'For Suppliers', icon: MessageCircle }
  ];

  const patientSteps = [
    {
      icon: UserPlus,
      title: 'Create Your Account',
      description: 'Sign up in minutes with your basic information. Your privacy is our priority with bank-level security.',
      color: 'bg-blue-500',
      features: ['Secure registration', 'Email verification', 'Profile setup', 'Privacy controls'],
      time: '2 minutes',
      details: 'Getting started is simple and secure. We only ask for essential information and use advanced encryption to protect your data. You can customize your privacy settings and choose what information to share.',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    },
    {
      icon: Search,
      title: 'Find & Book',
      description: 'Search for healthcare providers, compare options, and book your appointment instantly.',
      color: 'bg-primary',
      features: ['Smart search', 'Real-time availability', 'Instant booking', 'Provider comparison'],
      time: '30 seconds',
      details: 'Our intelligent search helps you find the right healthcare provider based on your location, specialty needs, insurance, and preferences. View real-time availability and book appointments instantly.',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    },
    {
      icon: Heart,
      title: 'Visit & Review',
      description: 'Attend your appointment and share your experience to help others in the community.',
      color: 'bg-secondary',
      features: ['Appointment reminders', 'Digital records', 'Community reviews', 'Follow-up care'],
      time: 'Ongoing',
      details: 'Receive timely reminders, access your digital health records, and share your experience to help other patients make informed decisions. Your feedback helps maintain quality standards.',
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    }
  ];

  const providerSteps = [
    {
      icon: UserPlus,
      title: 'Register Your Practice',
      description: 'Complete your professional profile with credentials, specialties, and practice information.',
      color: 'bg-green-500',
      features: ['License verification', 'Credential upload', 'Practice setup', 'Service listing'],
      time: '15 minutes',
      details: 'Set up your professional profile with medical licenses, certifications, and practice details. Our verification team ensures all providers meet quality standards.',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    },
    {
      icon: Calendar,
      title: 'Manage Appointments',
      description: 'Set your availability, manage bookings, and communicate with patients seamlessly.',
      color: 'bg-purple-500',
      features: ['Calendar integration', 'Automated scheduling', 'Patient communication', 'Reminder system'],
      time: 'Daily use',
      details: 'Streamline your practice with automated appointment management, patient communication tools, and integrated calendar systems that sync with your existing workflow.',
      image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    },
    {
      icon: Shield,
      title: 'Grow Your Practice',
      description: 'Access analytics, manage your reputation, and expand your patient base through our platform.',
      color: 'bg-indigo-500',
      features: ['Practice analytics', 'Reputation management', 'Patient acquisition', 'Revenue tracking'],
      time: 'Ongoing',
      details: 'Use detailed analytics to understand your practice performance, manage your online reputation, and attract new patients through our verified provider network.',
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    }
  ];

  const supplierSteps = [
    {
      icon: UserPlus,
      title: 'Supplier Registration',
      description: 'Register your company and upload certifications to join our verified supplier network.',
      color: 'bg-orange-500',
      features: ['Company verification', 'Certification upload', 'Product catalog', 'Quality assurance'],
      time: '30 minutes',
      details: 'Complete your company profile with certifications, product catalogs, and quality documentation. Our verification process ensures all suppliers meet healthcare standards.',
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    },
    {
      icon: Search,
      title: 'Browse Tenders',
      description: 'Access exclusive healthcare tenders and submit competitive proposals to healthcare providers.',
      color: 'bg-teal-500',
      features: ['Tender marketplace', 'Proposal submission', 'Direct communication', 'Contract management'],
      time: 'As needed',
      details: 'Browse active tenders from verified healthcare providers, submit detailed proposals, and communicate directly with procurement teams to secure contracts.',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    },
    {
      icon: MessageCircle,
      title: 'Manage Contracts',
      description: 'Track your contracts, manage deliveries, and build long-term relationships with healthcare providers.',
      color: 'bg-pink-500',
      features: ['Contract tracking', 'Delivery management', 'Performance analytics', 'Relationship building'],
      time: 'Ongoing',
      details: 'Manage your healthcare contracts efficiently with tracking tools, delivery management systems, and performance analytics to build lasting partnerships.',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2'
    }
  ];

  const getCurrentSteps = () => {
    switch (activeRole) {
      case 'provider': return providerSteps;
      case 'supplier': return supplierSteps;
      default: return patientSteps;
    }
  };

  const benefits = [
    { icon: Shield, text: 'HIPAA Compliant Security', description: 'Your data is protected with bank-level encryption' },
    { icon: MessageCircle, text: 'Direct Provider Communication', description: 'Secure messaging with healthcare professionals' },
    { icon: Calendar, text: 'Smart Scheduling System', description: 'AI-powered appointment optimization' },
    { icon: CheckCircle, text: '99.9% Uptime Guarantee', description: 'Reliable platform you can count on' }
  ];

  const faqs = [
    {
      question: 'How secure is my health information?',
      answer: 'We use bank-level encryption and comply with HIPAA standards to ensure your health information is completely secure and private.'
    },
    {
      question: 'Can I book appointments for my family?',
      answer: 'Yes! Our family care management feature allows you to manage healthcare for up to 5 family members from a single account.'
    },
    {
      question: 'What if I need to cancel or reschedule?',
      answer: 'You can easily cancel or reschedule appointments through the platform. We recommend doing so at least 24 hours in advance when possible.'
    },
    {
      question: 'How do I know if a provider accepts my insurance?',
      answer: 'Each provider profile clearly shows accepted insurance plans. You can also filter search results by your specific insurance provider.'
    }
  ];

  const handleRegister = onRegister || (() => window.location.href = '/');

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
              <CheckCircle className="w-4 h-4 mr-2" />
              Simple 3-step process for everyone
            </div>
            <h1 className="text-4xl md:text-6xl font-jakarta font-bold text-neutral-900 mb-6">
              How HealthLand Works
            </h1>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Whether you're a patient seeking care, a healthcare provider, or a medical supplier, 
              HealthLand makes it simple to connect and collaborate in the healthcare ecosystem.
            </p>
          </motion.div>

          {/* Role Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setActiveRole(role.id);
                  setActiveStep(0);
                }}
                className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-inter font-semibold transition-all duration-300 ${
                  activeRole === role.id
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                }`}
              >
                <role.icon className="w-5 h-5" />
                <span>{role.label}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Step Navigation */}
            <div className="space-y-6">
              <h2 className="text-3xl font-jakarta font-bold text-neutral-900 mb-8">
                {roles.find(r => r.id === activeRole)?.label} Process
              </h2>
              {getCurrentSteps().map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-primary/10 border-2 border-primary shadow-lg'
                      : 'bg-white border border-gray-200 hover:shadow-md'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${step.color} p-3 rounded-xl shadow-lg`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-jakarta font-bold text-neutral-900">
                          Step {index + 1}: {step.title}
                        </h3>
                        <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-inter font-medium">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-gray-600 font-inter text-sm leading-relaxed mb-3">
                        {step.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {step.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-inter">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Step Details */}
            <div className="lg:sticky lg:top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeRole}-${activeStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={getCurrentSteps()[activeStep].image}
                      alt={getCurrentSteps()[activeStep].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-jakarta font-bold mb-2">
                        {getCurrentSteps()[activeStep].title}
                      </h3>
                      <p className="text-sm opacity-90">
                        Step {activeStep + 1} of {getCurrentSteps().length}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <p className="text-gray-700 font-inter leading-relaxed mb-6 text-lg">
                      {getCurrentSteps()[activeStep].details}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <h4 className="font-jakarta font-semibold text-neutral-900">Features Included:</h4>
                      {getCurrentSteps()[activeStep].features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="font-inter">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        className="flex-1 bg-primary text-white py-3 rounded-xl font-inter font-semibold hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center"
                        onClick={handleRegister}
                      >
                        Get Started
                      </button>
                      <button
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-inter font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                        onClick={() => window.location.href = '/how-it-works'}
                      >
                        Watch Demo
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Why Choose HealthLand?
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Our platform is built with security, reliability, and user experience at its core, 
              ensuring the best possible healthcare technology experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group"
              >
                <div className="bg-primary/10 p-4 rounded-xl mb-6 w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-jakarta font-bold text-neutral-900 mb-3">
                  {benefit.text}
                </h3>
                <p className="text-gray-600 font-inter text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-jakarta font-bold text-neutral-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 font-inter leading-relaxed">
              Get answers to common questions about using HealthLand.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <h3 className="text-lg font-jakarta font-bold text-neutral-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;