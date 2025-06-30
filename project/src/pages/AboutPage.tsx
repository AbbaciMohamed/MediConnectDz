import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Globe, Award, Target, Lightbulb, Shield, TrendingUp, MapPin, Calendar, Star, CheckCircle } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: '50,000+', label: 'Active Patients', icon: Users },
    { number: '500+', label: 'Partner Clinics', icon: Heart },
    { number: '300+', label: 'Verified Suppliers', icon: Shield },
    { number: '48', label: 'Cities Covered', icon: MapPin }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Every decision we make is guided by what\'s best for patients and their families.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We maintain the highest standards of data security and privacy protection.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously innovate to improve healthcare accessibility and quality.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Healthcare should be accessible to everyone, regardless of location or background.',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const team = [
    {
      name: 'Dr. Ahmed Benali',
      role: 'Chief Medical Officer',
      bio: 'Leading cardiologist with 15+ years of experience in digital health transformation.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
    },
    {
      name: 'Fatima Cherif',
      role: 'Chief Technology Officer',
      bio: 'Former Google engineer specializing in healthcare AI and secure systems architecture.',
      image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
    },
    {
      name: 'Karim Mammeri',
      role: 'Chief Executive Officer',
      bio: 'Healthcare entrepreneur with a vision to democratize access to quality healthcare.',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
    },
    {
      name: 'Leila Hamidi',
      role: 'Head of Operations',
      bio: 'Operations expert focused on scaling healthcare solutions across North Africa.',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
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
              <Heart className="w-4 h-4 mr-2" />
              Transforming healthcare since 2022
            </div>
            <h1 className="text-4xl md:text-6xl font-jakarta font-bold text-neutral-900 mb-6">
              About HealthLand
            </h1>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make quality healthcare accessible to everyone in Algeria and beyond. 
              Through technology, innovation, and compassion, we're building the future of healthcare.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-4">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-jakarta font-bold text-neutral-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-inter">{stat.label}</div>
                </div>
              </div>
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
              <h2 className="text-3xl md:text-4xl font-jakarta font-bold text-neutral-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 font-inter leading-relaxed mb-8">
                To democratize access to quality healthcare by connecting patients with trusted 
                healthcare providers through innovative technology solutions. We believe that 
                everyone deserves access to excellent healthcare, regardless of their location 
                or circumstances.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="font-inter text-gray-700">Improve healthcare accessibility</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="font-inter text-gray-700">Enhance patient experience</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="font-inter text-gray-700">Support healthcare providers</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="font-inter text-gray-700">Drive healthcare innovation</span>
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
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <Target className="w-20 h-20 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-4">
                    Our Vision
                  </h3>
                  <p className="text-gray-700 font-inter leading-relaxed">
                    To become the leading healthcare platform in North Africa, 
                    setting the standard for digital health innovation and 
                    patient-centered care.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              Our Values
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
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
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group"
              >
                <div className={`bg-gradient-to-r ${value.color} p-4 rounded-xl mb-6 w-fit mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-jakarta font-bold text-neutral-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 font-inter leading-relaxed">
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
            <h2 className="text-3xl md:text-4xl font-jakarta font-bold text-neutral-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-jakarta font-bold text-neutral-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-inter font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 font-inter text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              From a small startup to a leading healthcare platform, here's how we've 
              grown and evolved to serve our community better.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20 hidden md:block"></div>
            
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
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                      <div className="text-primary font-jakarta font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-jakarta font-bold text-neutral-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 font-inter leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden md:flex w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>
                  
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
            <h2 className="text-3xl md:text-4xl font-jakarta font-bold text-neutral-900 mb-6">
              Recognition & Achievements
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
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
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300"
              >
                <Award className="w-8 h-8 text-primary flex-shrink-0" />
                <span className="font-inter font-medium text-gray-900">{achievement}</span>
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
                Join Our Healthcare Revolution
              </h3>
              <p className="text-lg md:text-xl font-inter mb-8 opacity-90 max-w-2xl mx-auto">
                Be part of the future of healthcare. Whether you're a patient, healthcare provider, 
                or supplier, there's a place for you in the HealthLand community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary px-8 py-4 rounded-xl font-inter font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
                >
                  Get Started Today
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-inter font-semibold text-lg hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  Contact Us
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;