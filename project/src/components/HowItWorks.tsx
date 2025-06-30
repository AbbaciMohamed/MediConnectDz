import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Calendar, Heart, MessageCircle, Shield, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Create Your Account',
    description: 'Sign up in minutes with your basic information. Your privacy is our priority with bank-level security.',
    color: 'bg-blue-500',
    features: ['Secure registration', 'Email verification', 'Profile setup'],
    time: '2 minutes'
  },
  {
    icon: Search,
    title: 'Find & Book',
    description: 'Search for healthcare providers, compare options, and book your appointment instantly.',
    color: 'bg-primary',
    features: ['Smart search', 'Real-time availability', 'Instant booking'],
    time: '30 seconds'
  },
  {
    icon: Heart,
    title: 'Visit & Review',
    description: 'Attend your appointment and share your experience to help others in the community.',
    color: 'bg-secondary',
    features: ['Appointment reminders', 'Digital records', 'Community reviews'],
    time: 'Ongoing'
  }
];

const benefits = [
  { icon: Shield, text: 'HIPAA Compliant Security' },
  { icon: MessageCircle, text: 'Direct Provider Communication' },
  { icon: Calendar, text: 'Smart Scheduling System' },
  { icon: CheckCircle, text: '99.9% Uptime Guarantee' }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-inter font-medium mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Simple 3-step process
          </div>
          <h2 className="text-4xl md:text-5xl font-jakarta font-bold text-neutral-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
            Getting started with HealthLand is simple. Follow these three easy steps to begin your 
            healthcare journey and connect with trusted providers.
          </p>
        </motion.div>

        <div className="relative mb-16">
          {/* Desktop: Horizontal layout */}
          <div className="hidden md:flex justify-between items-start relative">
            {/* Connector line */}
            <div className="absolute top-20 left-0 right-0 h-1 bg-gray-200 z-0">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-500 via-primary to-secondary relative"
              >
                {/* Animated progress dots */}
                <motion.div
                  animate={{ x: ['0%', '50%', '100%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full shadow-lg"
                />
              </motion.div>
            </div>

            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center max-w-sm z-10 bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white border-4 border-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-sm font-jakarta font-bold text-gray-600">{index + 1}</span>
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`${step.color} p-6 rounded-2xl mb-6 shadow-lg`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-jakarta font-bold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {step.description}
                  </p>

                  {/* Time indicator */}
                  <div className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-inter font-medium">
                    <Calendar className="w-3 h-3 mr-1" />
                    {step.time}
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="font-inter">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Vertical layout */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-start space-x-6 bg-white rounded-3xl p-6 shadow-lg"
              >
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  <div className="bg-white border-4 border-gray-100 rounded-full w-8 h-8 flex items-center justify-center mb-4">
                    <span className="text-sm font-jakarta font-bold text-gray-600">{index + 1}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-gray-200"></div>
                  )}
                </div>

                {/* Icon */}
                <div className={`${step.color} p-4 rounded-xl flex-shrink-0 shadow-lg`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-jakarta font-bold text-neutral-900">
                      {step.title}
                    </h3>
                    <div className="inline-flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-inter font-medium">
                      {step.time}
                    </div>
                  </div>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {step.description}
                  </p>
                  <div className="space-y-1">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        <span className="font-inter">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 mb-12"
        >
          <h3 className="text-2xl font-jakarta font-bold text-neutral-900 text-center mb-8">
            Why Choose HealthLand?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center space-x-3 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="bg-primary/10 p-2 rounded-lg">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-inter font-medium text-gray-800">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-jakarta font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg font-inter mb-6 opacity-90">
              Join thousands of patients who trust HealthLand for their healthcare needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary px-8 py-4 rounded-xl font-inter font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                Create Free Account
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
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;