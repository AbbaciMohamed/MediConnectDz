import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Users, Globe, Award, Target, Lightbulb, Shield, 
  MapPin, CheckCircle, ArrowRight, Twitter, Linkedin, Instagram 
} from 'lucide-react';

const AboutPage = () => {
  const [counterValues, setCounterValues] = useState({
    patients: 0,
    clinics: 0,
    suppliers: 0,
    cities: 0
  });

  const stats = [
    { number: '50,000+', label: 'Active Patients', icon: Users, key: 'patients', target: 50000 },
    { number: '500+', label: 'Partner Clinics', icon: Heart, key: 'clinics', target: 500 },
    { number: '300+', label: 'Verified Suppliers', icon: Shield, key: 'suppliers', target: 300 },
    { number: '48', label: 'Cities Covered', icon: MapPin, key: 'cities', target: 48 }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Every decision we make is guided by what\'s best for patients and their families.',
      color: 'bg-gradient-to-r from-rose-100 to-pink-100 border-pink-200 text-pink-600'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We maintain the highest standards of data security and privacy protection.',
      color: 'bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-200 text-blue-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously innovate to improve healthcare accessibility and quality.',
      color: 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200 text-amber-600'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Healthcare should be accessible to everyone, regardless of location or background.',
      color: 'bg-gradient-to-r from-emerald-100 to-teal-100 border-emerald-200 text-emerald-600'
    }
  ];

  const team = [
    {
      name: 'Dr. Ahmed Benali',
      role: 'Chief Medical Officer',
      bio: 'Leading cardiologist with 15+ years of experience in digital health transformation.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      social: [
        { icon: Twitter, url: '#' },
        { icon: Linkedin, url: '#' },
        { icon: Instagram, url: '#' }
      ]
    },
    {
      name: 'Fatima Cherif',
      role: 'Chief Technology Officer',
      bio: 'Former Google engineer specializing in healthcare AI and secure systems architecture.',
      image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      social: [
        { icon: Twitter, url: '#' },
        { icon: Linkedin, url: '#' },
        { icon: Instagram, url: '#' }
      ]
    },
    {
      name: 'Karim Mammeri',
      role: 'Chief Executive Officer',
      bio: 'Healthcare entrepreneur with a vision to democratize access to quality healthcare.',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      social: [
        { icon: Twitter, url: '#' },
        { icon: Linkedin, url: '#' },
        { icon: Instagram, url: '#' }
      ]
    },
    {
      name: 'Leila Hamidi',
      role: 'Head of Operations',
      bio: 'Operations expert focused on scaling healthcare solutions across North Africa.',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      social: [
        { icon: Twitter, url: '#' },
        { icon: Linkedin, url: '#' },
        { icon: Instagram, url: '#' }
      ]
    }
  ];

  const milestones = [
    {
      year: '2022',
      title: 'Company Founded',
      description: 'HealthLand was founded with a mission to transform healthcare in Algeria.'
    },
    {
      year: '2023',
      title: 'Platform Launch',
      description: 'Launched our comprehensive healthcare platform with 50 partner clinics.'
    },
    {
      year: '2024',
      title: 'Major Expansion',
      description: 'Expanded to 500+ clinics and introduced AI-powered features.'
    },
    {
      year: '2025',
      title: 'Regional Growth',
      description: 'Expanding across North Africa with 50,000+ active users.'
    }
  ];

  const achievements = [
    'Best Healthcare Innovation Award 2024',
    'Top 10 Healthtech Startups in MENA',
    'ISO 27001 Security Certification',
    'HIPAA Compliance Certification',
    '99.9% Platform Uptime Achievement',
    'Patient Safety Excellence Award'
  ];

  // Counter animation effect
  useEffect(() => {
    const duration = 3000;
    const increment = 10;
    
    const counters = {};
    stats.forEach(stat => {
      counters[stat.key] = setInterval(() => {
        setCounterValues(prev => {
          const current = prev[stat.key];
          const target = stat.target;
          const step = Math.ceil(target / (duration / increment));
          
          if (current < target) {
            return {
              ...prev,
              [stat.key]: Math.min(current + step, target)
            };
          }
          return prev;
        });
      }, increment);
    });
    
    return () => {
      stats.forEach(stat => {
        clearInterval(counters[stat.key]);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-200/30 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-teal-200/30 blur-2xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-pink-200/30 blur-xl animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-md"
            >
              <Heart className="w-4 h-4 mr-2" />
              Transforming healthcare since 2022
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                About HealthLand
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              We're on a mission to make quality healthcare accessible to everyone in Algeria and beyond. 
              Through technology, innovation, and compassion, we're building the future of healthcare.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-4 hover:shadow-xl transition-shadow">
                  <stat.icon className="w-10 h-10 text-blue-600 mx-auto mb-3 p-2 bg-blue-50 rounded-full" />
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {counterValues[stat.key].toLocaleString()}
                    {stat.number.includes('+') && '+'}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full mr-4"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                To democratize access to quality healthcare by connecting patients with trusted 
                healthcare providers through innovative technology solutions. We believe that 
                everyone deserves access to excellent healthcare, regardless of their location 
                or circumstances.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 bg-green-100 p-1 rounded-full" />
                  <span className="text-gray-600">Improve healthcare accessibility</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 bg-green-100 p-1 rounded-full" />
                  <span className="text-gray-600">Enhance patient experience</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 bg-green-100 p-1 rounded-full" />
                  <span className="text-gray-600">Support healthcare providers</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 bg-green-100 p-1 rounded-full" />
                  <span className="text-gray-600">Drive healthcare innovation</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 aspect-square flex items-center justify-center border border-gray-200 shadow-lg">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Target className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Our Vision
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    To become the leading healthcare platform in North Africa, 
                    setting the standard for digital health innovation and 
                    patient-centered care.
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 z-[-1]"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 z-[-1] opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
              Our Core Principles
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Guiding Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These core values guide everything we do and shape how we approach 
              healthcare innovation and patient care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`${value.color} p-4 rounded-xl mb-6 w-fit`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
              Leadership Team
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our diverse team of healthcare professionals, technologists, and innovators 
              is dedicated to transforming healthcare for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <p className="text-sm">{member.bio}</p>
                      <div className="flex mt-4 space-x-3">
                        {member.social.map((social, idx) => (
                          <a 
                            key={idx} 
                            href={social.url} 
                            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                          >
                            <social.icon className="w-4 h-4 text-white" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
              Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Milestones & Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From a small startup to a leading healthcare platform, here's how we've 
              grown and evolved to serve our community better.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-teal-500 hidden md:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 to-teal-500"></div>
                      <div className="text-blue-600 font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden md:flex w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full border-4 border-white shadow-lg z-10 items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
              Awards & Recognition
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're proud of the recognition we've received for our commitment to 
              healthcare innovation and excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {achievement}
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
            className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/20 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Join Our Healthcare Revolution
              </h3>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Be part of the future of healthcare. Whether you're a patient, healthcare provider, 
                or supplier, there's a place for you in the HealthLand community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/features"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg cursor-pointer flex items-center justify-center"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 cursor-pointer flex items-center justify-center"
                >
                  Contact Us
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;