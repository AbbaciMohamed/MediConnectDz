import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Calendar, Heart, MessageCircle, Shield, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Sign Up Instantly',
    description: 'Create your free HealthLand account in seconds. All you need is your basic info—no paperwork required.',
    color: 'bg-blue-500',
    features: ['Quick registration', 'Secure data', 'No hidden fees'],
    time: '1 min'
  },
  {
    icon: Search,
    title: 'Find & Book Care',
    description: 'Search for clinics, compare providers, and book appointments online—anytime, anywhere.',
    color: 'bg-primary',
    features: ['Smart search', 'Real-time booking', 'Verified reviews'],
    time: '30 sec'
  },
  {
    icon: Heart,
    title: 'Get Treated & Review',
    description: 'Visit your clinic, get the care you need, and share your experience to help others.',
    color: 'bg-secondary',
    features: ['Easy check-in', 'Digital records', 'Community feedback'],
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
    <section id="how-it-works" className="relative py-16 md:py-24 bg-gradient-to-br from-white via-blue-50 to-primary/10 overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute -top-16 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow z-0" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-2xl animate-float z-0" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-inter font-medium mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Simple 3-step process
          </div>
          <h2 className="text-4xl md:text-5xl font-jakarta font-bold text-neutral-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
            HealthLand makes healthcare simple. Create your account, find and book trusted providers, and manage your health journey—all in just a few steps.
          </p>
        </motion.div>

        <div className="relative mb-10 md:mb-20">
          {/* Desktop: Horizontal layout */}
          <div className="hidden md:flex justify-between items-start relative">
            {/* Connector line */}
            <div className="absolute top-20 left-0 right-0 h-1 z-0">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-400 via-primary to-secondary shadow-lg rounded-full"
              >
                {/* Animated progress dots */}
                <motion.div
                  animate={{ x: ['0%', '50%', '100%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-4 border-primary rounded-full shadow-xl opacity-80"
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
                whileHover={{ y: -10, scale: 1.04, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}
                className="flex flex-col items-center text-center max-w-sm z-10 bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-primary/30 transition-all duration-300 relative border border-primary/10"
              >
                {/* Step number */}
                <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-primary to-blue-400 shadow-xl border-4 border-white rounded-full w-14 h-14 flex items-center justify-center z-20">
                  <span className="text-2xl font-jakarta font-bold text-white drop-shadow-lg">{index + 1}</span>
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.18, rotate: 8, boxShadow: '0 0 32px 0 rgba(56,189,248,0.25)' }}
                  className={`${step.color} p-7 rounded-2xl mb-7 shadow-lg flex items-center justify-center`}
                >
                  <step.icon className="w-10 h-10 text-white drop-shadow-lg" />
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-jakarta font-bold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {step.description}
                  </p>

                  {/* Time indicator */}
                  <div className="inline-flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-base font-inter font-medium shadow-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {step.time}
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-base text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="font-inter">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Vertical layout */}
          <div className="md:hidden space-y-10">
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
                  <div className="bg-gradient-to-br from-primary to-blue-400 shadow-xl border-4 border-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-lg font-jakarta font-bold text-white drop-shadow-lg">{index + 1}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-gray-200"></div>
                  )}
                </div>

                {/* Icon */}
                <div className={`${step.color} p-5 rounded-xl flex-shrink-0 shadow-lg flex items-center justify-center`}>
                  <step.icon className="w-8 h-8 text-white drop-shadow-lg" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-jakarta font-bold text-neutral-900">
                      {step.title}
                    </h3>
                    <div className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-inter font-medium shadow-sm">
                      {step.time}
                    </div>
                  </div>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {step.description}
                  </p>
                  <div className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-base text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
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
      </div>
    </section>
  );
};

export default HowItWorks;