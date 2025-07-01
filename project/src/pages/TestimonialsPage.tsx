import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Heart, MapPin, Calendar, Users, TrendingUp, CheckCircle } from 'lucide-react';

const TestimonialsPage = ({ onRegister }: { onRegister?: () => void }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleRegister = onRegister || (() => window.location.href = '/');

  const testimonials = [
    {
      id: 1,
      name: 'Amina Boudiaf',
      role: 'Patient',
      location: 'Algiers',
      category: 'patient',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'HealthLand made it so easy to find a cardiologist near me. The booking process was seamless, and the doctor was excellent. The platform saved me hours of calling different clinics!',
      service: 'Cardiology Consultation',
      date: '2 weeks ago',
      verified: true,
      fullReview: 'I was experiencing chest pains and needed to see a cardiologist urgently. HealthLand helped me find Dr. Benali who had availability the same day. The entire process from booking to consultation was smooth and professional. The platform even sent me reminders and allowed me to upload my previous test results beforehand.'
    },
    {
      id: 2,
      name: 'Dr. Ahmed Benali',
      role: 'Cardiologist',
      location: 'Algiers Medical Center',
      category: 'provider',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'HealthLand has revolutionized how I manage my practice. The security features give me confidence in handling sensitive patient data, and the scheduling system has reduced no-shows by 40%.',
      service: 'Practice Management',
      date: '1 month ago',
      verified: true,
      fullReview: 'As a healthcare provider, I was initially skeptical about digital platforms. However, HealthLand has exceeded my expectations. The patient management system is intuitive, the security measures are robust, and my patients love the convenience. My practice efficiency has improved significantly.'
    },
    {
      id: 3,
      name: 'Karim Benali',
      role: 'Patient',
      location: 'Oran',
      category: 'patient',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'I was able to book an appointment with a pediatrician for my daughter within minutes. The platform is user-friendly and the service is exceptional. The reminder notifications were very helpful.',
      service: 'Pediatric Care',
      date: '1 week ago',
      verified: true,
      fullReview: 'My 5-year-old daughter had a fever and I was worried. Using HealthLand, I quickly found a pediatrician with excellent reviews who could see her the same day. The doctor was wonderful with children and the follow-up care instructions were sent digitally, which was very convenient.'
    },
    {
      id: 4,
      name: 'Fatima Cherif',
      role: 'Patient',
      location: 'Constantine',
      category: 'patient',
      avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'The direct messaging feature allowed me to communicate with my doctor before the visit. This saved me time and helped me prepare better for my appointment. Truly innovative!',
      service: 'General Medicine',
      date: '3 days ago',
      verified: true,
      fullReview: 'I had some concerns about my symptoms and was able to message Dr. Hamidi through the platform before my appointment. She responded quickly and gave me preliminary advice, which put my mind at ease. The secure messaging feature is a game-changer for patient care.'
    },
    {
      id: 5,
      name: 'Dr. Leila Hamidi',
      role: 'General Practitioner',
      location: 'Constantine Medical Complex',
      category: 'provider',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'The analytics dashboard helps me understand my practice better. I can see patient trends, popular time slots, and even track patient satisfaction. It\'s like having a practice manager built into the platform.',
      service: 'Practice Analytics',
      date: '2 weeks ago',
      verified: true,
      fullReview: 'The insights I get from HealthLand have transformed how I run my practice. I can see which services are most in demand, optimize my schedule, and even identify patients who might need follow-up care. The platform has made me a better doctor and businessman.'
    },
    {
      id: 6,
      name: 'Yacine Mammeri',
      role: 'Patient',
      location: 'Annaba',
      category: 'patient',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'HealthLand has revolutionized how I access healthcare. The 24/7 support and secure platform give me peace of mind when managing my health. The emergency feature is a lifesaver!',
      service: 'Emergency Care',
      date: '5 days ago',
      verified: true,
      fullReview: 'I had a medical emergency at 2 AM and used HealthLand to find the nearest emergency room with the shortest wait time. The platform showed me real-time availability and even helped me prepare the necessary documents. This kind of service is invaluable during emergencies.'
    },
    {
      id: 7,
      name: 'Leila Hamidi',
      role: 'Patient',
      location: 'Tlemcen',
      category: 'patient',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'As a working mother, HealthLand has been a blessing. I can manage appointments for my entire family from one platform. The family care features are outstanding!',
      service: 'Family Medicine',
      date: '1 week ago',
      verified: true,
      fullReview: 'Managing healthcare for a family of five was always stressful. HealthLand\'s family management feature lets me book appointments for everyone, track vaccination schedules, and even share medical history with different doctors when needed. It\'s made my life so much easier.'
    },
    {
      id: 8,
      name: 'Omar Benaissa',
      role: 'Patient',
      location: 'Sétif',
      category: 'patient',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'The AI health assistant helped me understand my symptoms before my appointment. The doctor was impressed with how well-prepared I was. This platform is the future of healthcare!',
      service: 'Internal Medicine',
      date: '4 days ago',
      verified: true,
      fullReview: 'I was experiencing some unusual symptoms and the AI assistant helped me document them properly and suggested relevant questions to ask my doctor. When I met with Dr. Benali, he was impressed with the detailed symptom log and it helped him make a faster diagnosis.'
    },
    {
      id: 9,
      name: 'Algerian Pharmaceuticals Ltd',
      role: 'Medical Supplier',
      location: 'Oran',
      category: 'supplier',
      avatar: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'HealthLand\'s marketplace has opened new opportunities for our business. We\'ve secured contracts with 15 new clinics through the platform. The tender process is transparent and efficient.',
      service: 'Pharmaceutical Supply',
      date: '3 weeks ago',
      verified: true,
      fullReview: 'We\'ve been in the pharmaceutical business for 20 years, but HealthLand has given us access to opportunities we never had before. The platform\'s verification process ensures we work with legitimate healthcare providers, and the contract management tools have streamlined our operations significantly.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Reviews', count: testimonials.length },
    { id: 'patient', label: 'Patients', count: testimonials.filter(t => t.category === 'patient').length },
    { id: 'provider', label: 'Healthcare Providers', count: testimonials.filter(t => t.category === 'provider').length },
    { id: 'supplier', label: 'Suppliers', count: testimonials.filter(t => t.category === 'supplier').length }
  ];

  const stats = [
    { number: '4.9/5', label: 'Average Rating', icon: Star },
    { number: '50,000+', label: 'Happy Patients', icon: Heart },
    { number: '500+', label: 'Partner Clinics', icon: Users },
    { number: '99.9%', label: 'Satisfaction Rate', icon: TrendingUp }
  ];

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

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
              Trusted by thousands across Algeria
            </div>
            <h1 className="text-4xl md:text-6xl font-jakarta font-bold text-neutral-900 mb-6">
              What Our Community Says
            </h1>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Real stories from patients, healthcare providers, and suppliers who have experienced 
              the transformative power of HealthLand's healthcare platform.
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

      {/* Category Filter */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setCurrentTestimonial(0);
                }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-inter font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                }`}
              >
                <span>{category.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Navigation arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30 z-10 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-neutral-900 group-hover:text-primary transition-colors duration-300" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30 z-10 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-neutral-900 group-hover:text-primary transition-colors duration-300" />
            </button>

            {/* Testimonial Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${currentTestimonial}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
              >
                <div className="p-8 md:p-12">
                  {/* Quote icon */}
                  <div className="text-center mb-8">
                    <Quote className="w-16 h-16 text-primary/20 mx-auto" />
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    {[...Array(filteredTestimonials[currentTestimonial]?.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <blockquote className="text-center text-xl md:text-2xl text-gray-700 font-inter leading-relaxed mb-8 max-w-4xl mx-auto">
                    "{filteredTestimonials[currentTestimonial]?.fullReview || filteredTestimonials[currentTestimonial]?.text}"
                  </blockquote>

                  {/* Author info */}
                  <div className="flex items-center justify-center space-x-6">
                    <div className="relative">
                      <img
                        src={filteredTestimonials[currentTestimonial]?.avatar}
                        alt={`${filteredTestimonials[currentTestimonial]?.name} profile`}
                        className="w-16 h-16 rounded-full object-cover border-4 border-gray-100"
                      />
                      {filteredTestimonials[currentTestimonial]?.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                          <CheckCircle className="w-4 h-4 fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="font-jakarta font-bold text-neutral-900 text-lg">
                        {filteredTestimonials[currentTestimonial]?.name}
                      </h3>
                      <p className="text-gray-600 font-inter">
                        {filteredTestimonials[currentTestimonial]?.role}
                      </p>
                      <div className="flex items-center justify-center text-gray-500 text-sm font-inter mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {filteredTestimonials[currentTestimonial]?.location}
                      </div>
                    </div>
                  </div>

                  {/* Service and date */}
                  <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-gray-100">
                    <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-inter font-medium">
                      {filteredTestimonials[currentTestimonial]?.service}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 font-inter">
                      <Calendar className="w-4 h-4 mr-1" />
                      {filteredTestimonials[currentTestimonial]?.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dot pagination */}
            <div className="flex justify-center mt-8 space-x-3">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentTestimonial === index 
                      ? 'bg-primary w-8 h-3' 
                      : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
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
              More Success Stories
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Discover how HealthLand has made a difference in the lives of patients, 
              healthcare providers, and suppliers across Algeria.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.slice(0, 6).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group"
              >
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-300"></div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial text */}
                <blockquote className="text-gray-700 font-inter leading-relaxed mb-6">
                  "{testimonial.text}"
                </blockquote>

                {/* Author info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.name} profile`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                    />
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                        <CheckCircle className="w-3 h-3 fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-jakarta font-bold text-neutral-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 font-inter text-sm">{testimonial.role}</p>
                    <div className="flex items-center text-gray-500 text-xs font-inter mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>

                {/* Service tag */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-inter font-medium">
                      {testimonial.service}
                    </span>
                    <span className="text-xs text-gray-500 font-inter">{testimonial.date}</span>
                  </div>
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
                Join Our Community of Satisfied Users
              </h3>
              <p className="text-lg md:text-xl font-inter mb-8 opacity-90 max-w-2xl mx-auto">
                Experience the same quality care and exceptional service that our community 
                members rave about. Start your healthcare journey with HealthLand today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-primary text-white px-8 py-4 rounded-xl font-inter font-semibold text-lg shadow-lg hover:bg-primary/90 transition-colors duration-200 mr-4"
                  onClick={handleRegister}
                >
                  Get Started Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-inter font-semibold text-lg hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  Share Your Story
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;