import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, MapPin, Calendar, Heart } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Amina Boudiaf',
    role: 'Patient',
    location: 'Algiers',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
    text: 'HealthLand made it so easy to find a cardiologist near me. The booking process was seamless, and the doctor was excellent. The platform saved me hours of calling different clinics!',
    service: 'Cardiology Consultation',
    date: '2 weeks ago',
    verified: true
  },
  {
    id: 2,
    name: 'Karim Benali',
    role: 'Patient',
    location: 'Oran',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
    text: 'I was able to book an appointment with a pediatrician for my daughter within minutes. The platform is user-friendly and the service is exceptional. The reminder notifications were very helpful.',
    service: 'Pediatric Care',
    date: '1 week ago',
    verified: true
  },
  {
    id: 3,
    name: 'Fatima Cherif',
    role: 'Patient',
    location: 'Constantine',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
    text: 'The direct messaging feature allowed me to communicate with my doctor before the visit. This saved me time and helped me prepare better for my appointment. Truly innovative!',
    service: 'General Medicine',
    date: '3 days ago',
    verified: true
  },
  {
    id: 4,
    name: 'Yacine Mammeri',
    role: 'Patient',
    location: 'Annaba',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
    text: 'HealthLand has revolutionized how I access healthcare. The 24/7 support and secure platform give me peace of mind when managing my health. The emergency feature is a lifesaver!',
    service: 'Emergency Care',
    date: '5 days ago',
    verified: true
  },
  {
    id: 5,
    name: 'Leila Hamidi',
    role: 'Patient',
    location: 'Tlemcen',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
    text: 'As a working mother, HealthLand has been a blessing. I can manage appointments for my entire family from one platform. The family care features are outstanding!',
    service: 'Family Medicine',
    date: '1 week ago',
    verified: true
  },
  {
    id: 6,
    name: 'Omar Benaissa',
    role: 'Patient',
    location: 'Sétif',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
    text: 'The AI health assistant helped me understand my symptoms before my appointment. The doctor was impressed with how well-prepared I was. This platform is the future of healthcare!',
    service: 'Internal Medicine',
    date: '4 days ago',
    verified: true
  }
];

const stats = [
  { number: '50,000+', label: 'Happy Patients' },
  { number: '500+', label: 'Partner Clinics' },
  { number: '4.9/5', label: 'Average Rating' },
  { number: '99.9%', label: 'Uptime' }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState(2);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setVisibleTestimonials(window.innerWidth >= 768 ? 2 : 1);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + visibleTestimonials) >= testimonials.length 
            ? 0 
            : prevIndex + visibleTestimonials
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [visibleTestimonials, isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + visibleTestimonials) >= testimonials.length 
        ? 0 
        : prevIndex + visibleTestimonials
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 
        ? testimonials.length - visibleTestimonials 
        : prevIndex - visibleTestimonials
    );
  };

  const currentTestimonials = testimonials.slice(
    currentIndex, 
    currentIndex + visibleTestimonials
  );

  // Handle wrap-around for visible testimonials
  if (currentTestimonials.length < visibleTestimonials) {
    const remaining = visibleTestimonials - currentTestimonials.length;
    currentTestimonials.push(...testimonials.slice(0, remaining));
  }

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-inter font-medium mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Trusted by thousands
          </div>
          <h2 className="text-4xl md:text-5xl font-jakarta font-bold text-neutral-900 mb-6">
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what real patients have to say about their 
            HealthLand experience and how we've transformed their healthcare journey.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-3xl md:text-4xl font-jakarta font-bold text-primary mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600 font-inter">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation arrows */}
          <button
            onClick={() => {
              prevTestimonial();
              setIsAutoPlaying(false);
            }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30 z-10 group"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6 text-neutral-900 group-hover:text-primary transition-colors duration-300" />
          </button>

          <button
            onClick={() => {
              nextTestimonial();
              setIsAutoPlaying(false);
            }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30 z-10 group"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6 text-neutral-900 group-hover:text-primary transition-colors duration-300" />
          </button>

          {/* Testimonials container */}
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`grid gap-8 ${visibleTestimonials === 2 ? 'md:grid-cols-2' : 'grid-cols-1'}`}
              >
                {currentTestimonials.map((testimonial) => (
                  <motion.div
                    key={`${testimonial.id}-${currentIndex}`}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
                  >
                    {/* Quote icon */}
                    <div className="absolute top-6 right-6 opacity-10">
                      <Quote className="w-12 h-12 text-primary" />
                    </div>

                    {/* Header */}
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <img
                          src={testimonial.avatar}
                          alt={`${testimonial.name} profile`}
                          className="w-16 h-16 rounded-full object-cover border-4 border-gray-100"
                        />
                        {testimonial.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                            <Star className="w-3 h-3 fill-current" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-jakarta font-bold text-neutral-900 text-lg">
                          {testimonial.name}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm font-inter mb-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {testimonial.location}
                        </div>
                        <div className="flex items-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Testimonial text */}
                    <blockquote className="text-gray-700 font-inter leading-relaxed mb-6 text-lg">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-500 font-inter">
                        <Calendar className="w-4 h-4 mr-1" />
                        {testimonial.date}
                      </div>
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-inter font-medium">
                        {testimonial.service}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot pagination */}
          <div className="flex justify-center mt-12 space-x-3">
            {Array.from({ length: Math.ceil(testimonials.length / visibleTestimonials) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index * visibleTestimonials);
                  setIsAutoPlaying(false);
                }}
                className={`transition-all duration-300 rounded-full ${
                  Math.floor(currentIndex / visibleTestimonials) === index 
                    ? 'bg-primary w-8 h-3' 
                    : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                }`}
                aria-label={`Go to testimonial set ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;