import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Star, Filter, Clock, Phone, Navigation, Heart, Shield, Award, Users, ChevronDown, SlidersHorizontal, X } from 'lucide-react';

const ClinicSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [isLocationDetecting, setIsLocationDetecting] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const mockClinics = [
    { 
      id: 1,
      name: 'Algiers Medical Center', 
      specialty: 'General Medicine', 
      rating: 4.8, 
      reviewCount: 324,
      distance: '0.5 km',
      waitTime: '15 min',
      isOpen: true,
      isEmergency: true,
      phone: '+213 21 123 456',
      address: '123 Rue Didouche Mourad, Algiers',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      services: ['Emergency Care', 'General Consultation', 'Lab Tests', 'Radiology'],
      acceptsInsurance: true,
      isVerified: true,
      isFeatured: true,
      price: '2,500 DZD',
      location: 'Algiers',
      openingHours: '24/7'
    },
    { 
      id: 2,
      name: 'Cardiology Clinic Oran', 
      specialty: 'Cardiology', 
      rating: 4.9, 
      reviewCount: 156,
      distance: '1.2 km',
      waitTime: '25 min',
      isOpen: true,
      isEmergency: false,
      phone: '+213 41 987 654',
      address: '456 Boulevard de la Revolution, Oran',
      image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      services: ['Cardiology', 'ECG', 'Stress Testing', 'Echocardiography'],
      acceptsInsurance: true,
      isVerified: true,
      isFeatured: false,
      price: '4,000 DZD',
      location: 'Oran',
      openingHours: '8:00 AM - 6:00 PM'
    },
    { 
      id: 3,
      name: 'Pediatric Care Constantine', 
      specialty: 'Pediatrics', 
      rating: 4.7, 
      reviewCount: 89,
      distance: '2.1 km',
      waitTime: '10 min',
      isOpen: true,
      isEmergency: false,
      phone: '+213 31 555 789',
      address: '789 Rue Ben Badis, Constantine',
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      services: ['Pediatrics', 'Vaccinations', 'Child Development', 'Nutrition'],
      acceptsInsurance: false,
      isVerified: true,
      isFeatured: false,
      price: '3,200 DZD',
      location: 'Constantine',
      openingHours: '9:00 AM - 5:00 PM'
    },
    { 
      id: 4,
      name: 'Dental Excellence Clinic', 
      specialty: 'Dentistry', 
      rating: 4.6, 
      reviewCount: 203,
      distance: '1.8 km',
      waitTime: '20 min',
      isOpen: true,
      isEmergency: false,
      phone: '+213 21 444 555',
      address: '321 Avenue Pasteur, Algiers',
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      services: ['General Dentistry', 'Orthodontics', 'Cosmetic Dentistry', 'Oral Surgery'],
      acceptsInsurance: true,
      isVerified: true,
      isFeatured: true,
      price: '2,800 DZD',
      location: 'Algiers',
      openingHours: '8:00 AM - 7:00 PM'
    },
    { 
      id: 5,
      name: 'Dermatology Specialists Annaba', 
      specialty: 'Dermatology', 
      rating: 4.5, 
      reviewCount: 142,
      distance: '3.2 km',
      waitTime: '30 min',
      isOpen: true,
      isEmergency: false,
      phone: '+213 38 777 888',
      address: '654 Rue de la Liberté, Annaba',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      services: ['Dermatology', 'Skin Cancer Screening', 'Cosmetic Procedures', 'Acne Treatment'],
      acceptsInsurance: true,
      isVerified: true,
      isFeatured: false,
      price: '3,500 DZD',
      location: 'Annaba',
      openingHours: '9:00 AM - 6:00 PM'
    },
    { 
      id: 6,
      name: 'Orthopedic Center Blida', 
      specialty: 'Orthopedics', 
      rating: 4.4, 
      reviewCount: 98,
      distance: '4.5 km',
      waitTime: '45 min',
      isOpen: false,
      isEmergency: false,
      phone: '+213 25 333 444',
      address: '987 Boulevard Boumediene, Blida',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      services: ['Orthopedics', 'Sports Medicine', 'Joint Replacement', 'Physical Therapy'],
      acceptsInsurance: true,
      isVerified: true,
      isFeatured: false,
      price: '4,500 DZD',
      location: 'Blida',
      openingHours: '8:00 AM - 4:00 PM'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Clinics', count: mockClinics.length, icon: Users },
    { id: 'emergency', label: 'Emergency', count: mockClinics.filter(c => c.isEmergency).length, icon: Clock },
    { id: 'open', label: 'Open Now', count: mockClinics.filter(c => c.isOpen).length, icon: Calendar },
    { id: 'insurance', label: 'Accepts Insurance', count: mockClinics.filter(c => c.acceptsInsurance).length, icon: Shield },
    { id: 'featured', label: 'Featured', count: mockClinics.filter(c => c.isFeatured).length, icon: Award }
  ];

  const locations = [
    { id: 'all', label: 'All Locations' },
    { id: 'Algiers', label: 'Algiers' },
    { id: 'Oran', label: 'Oran' },
    { id: 'Constantine', label: 'Constantine' },
    { id: 'Annaba', label: 'Annaba' },
    { id: 'Blida', label: 'Blida' }
  ];

  const specialties = [
    { id: 'all', label: 'All Specialties' },
    { id: 'General Medicine', label: 'General Medicine' },
    { id: 'Cardiology', label: 'Cardiology' },
    { id: 'Pediatrics', label: 'Pediatrics' },
    { id: 'Dentistry', label: 'Dentistry' },
    { id: 'Dermatology', label: 'Dermatology' },
    { id: 'Orthopedics', label: 'Orthopedics' }
  ];

  const sortOptions = [
    { id: 'relevance', label: 'Relevance' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'distance', label: 'Nearest' },
    { id: 'price', label: 'Price: Low to High' },
    { id: 'availability', label: 'Shortest Wait Time' }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(true);
    
    if (query.length > 2) {
      const mockSuggestions = [
        'Cardiology near me',
        'Pediatrics in Algiers',
        'General Medicine',
        'Dermatology clinic',
        'Orthopedic specialist',
        'Emergency room',
        'Dental care',
        'Eye clinic',
        'Mental health services',
        'Physical therapy'
      ].filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const detectLocation = async () => {
    setIsLocationDetecting(true);
    setTimeout(() => {
      setSearchQuery('Algiers, Algeria');
      setSuggestions([]);
      setShowResults(true);
      setIsLocationDetecting(false);
    }, 2000);
  };

  const filteredClinics = mockClinics.filter(clinic => {
    const matchesSearch = searchQuery === '' || 
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'emergency' && clinic.isEmergency) ||
      (selectedFilter === 'open' && clinic.isOpen) ||
      (selectedFilter === 'insurance' && clinic.acceptsInsurance) ||
      (selectedFilter === 'featured' && clinic.isFeatured);

    const matchesLocation = selectedLocation === 'all' || clinic.location === selectedLocation;
    const matchesSpecialty = selectedSpecialty === 'all' || clinic.specialty === selectedSpecialty;
    
    return matchesSearch && matchesFilter && matchesLocation && matchesSpecialty;
  });

  // Sort clinics
  const sortedClinics = [...filteredClinics].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'price':
        return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
      case 'availability':
        return parseInt(a.waitTime) - parseInt(b.waitTime);
      default:
        // Featured first, then by rating
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.rating - a.rating;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-inter font-semibold mb-6 shadow-sm">
              <MapPin className="w-4 h-4 mr-2" />
              500+ verified clinics • Real-time availability
            </div>
            <h1 className="text-4xl md:text-6xl font-jakarta font-bold text-neutral-900 mb-6">
              Find Healthcare Near You
            </h1>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Search for clinics, specialists, and healthcare services in your area. 
              Real-time availability, instant booking, and verified providers.
            </p>
          </motion.div>

          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search by specialty, clinic name, or location..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-16 pr-4 py-6 text-lg font-inter focus:outline-none focus:ring-0 border-0 placeholder-gray-500"
                    aria-label="Search for clinics and specialists"
                  />
                </div>
                <div className="flex border-t lg:border-t-0 lg:border-l border-gray-200">
                  <button
                    onClick={detectLocation}
                    disabled={isLocationDetecting}
                    className="bg-primary text-white px-8 py-6 hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/30 flex items-center disabled:opacity-50 min-w-[140px]"
                    aria-label="Detect current location"
                  >
                    {isLocationDetecting ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Navigation className="w-6 h-6" />
                    )}
                    <span className="ml-3 font-inter font-semibold hidden sm:block">
                      {isLocationDetecting ? 'Locating...' : 'Near Me'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Autocomplete suggestions */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="border-t border-gray-200 bg-white"
                  >
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setSuggestions([]);
                          setShowResults(true);
                        }}
                        className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors duration-200 font-inter flex items-center border-b border-gray-100 last:border-b-0"
                      >
                        <Search className="w-5 h-5 mr-4 text-gray-400" />
                        <span className="text-gray-700">{suggestion}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Controls */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Quick Filters */}
              <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-6 py-3 rounded-xl font-inter font-semibold transition-all duration-300 flex items-center shadow-sm ${
                      selectedFilter === filter.id
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <filter.icon className="w-4 h-4 mr-2" />
                    {filter.label}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                      selectedFilter === filter.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-inter font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>More Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Location</label>
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                      >
                        {locations.map(location => (
                          <option key={location.id} value={location.id}>
                            {location.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Specialty</label>
                      <select
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                      >
                        {specialties.map(specialty => (
                          <option key={specialty.id} value={specialty.id}>
                            {specialty.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                      >
                        {sortOptions.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={() => {
                          setSelectedLocation('all');
                          setSelectedSpecialty('all');
                          setSortBy('relevance');
                          setSelectedFilter('all');
                        }}
                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-inter font-medium hover:bg-gray-50 transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-jakarta font-bold text-neutral-900">
              {sortedClinics.length} clinics found
            </h2>
            <div className="text-sm text-gray-600 font-inter bg-gray-100 px-3 py-1 rounded-full">
              Sorted by {sortOptions.find(opt => opt.id === sortBy)?.label.toLowerCase()}
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sortedClinics.map((clinic, index) => (
              <motion.div
                key={clinic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group relative"
              >
                {clinic.isFeatured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-inter font-bold z-10 shadow-lg">
                    <Award className="w-3 h-3 inline mr-1" />
                    FEATURED
                  </div>
                )}

                <div className="flex flex-col md:flex-row">
                  {/* Clinic Image */}
                  <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
                    <img
                      src={clinic.image}
                      alt={clinic.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {clinic.isEmergency && (
                      <div className="absolute bottom-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-inter font-bold flex items-center shadow-lg">
                        <Clock className="w-3 h-3 mr-1" />
                        Emergency
                      </div>
                    )}
                    {clinic.isOpen ? (
                      <div className="absolute bottom-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-inter font-bold flex items-center shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                        Open
                      </div>
                    ) : (
                      <div className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-inter font-bold flex items-center shadow-lg">
                        Closed
                      </div>
                    )}
                  </div>

                  {/* Clinic Info */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-jakarta font-bold text-neutral-900 group-hover:text-primary transition-colors duration-300">
                            {clinic.name}
                          </h3>
                          {clinic.isVerified && (
                            <Shield className="w-5 h-5 text-blue-500 ml-2" title="Verified Clinic" />
                          )}
                        </div>
                        <p className="text-primary font-inter font-semibold mb-2">{clinic.specialty}</p>
                        <p className="text-sm text-gray-500 font-inter flex items-center mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          {clinic.address}
                        </p>
                        
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-inter font-semibold">{clinic.rating}</span>
                            <span className="text-sm text-gray-500 ml-1">({clinic.reviewCount} reviews)</span>
                          </div>
                          <div className="text-sm text-gray-600 font-inter">{clinic.distance}</div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {clinic.waitTime}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="text-lg font-jakarta font-bold text-neutral-900 mb-1">
                          {clinic.price}
                        </div>
                        <div className="text-sm text-gray-500 font-inter">Starting from</div>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {clinic.services.slice(0, 4).map((service, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-inter"
                        >
                          {service}
                        </span>
                      ))}
                      {clinic.services.length > 4 && (
                        <span className="text-sm text-gray-500 font-inter px-3 py-1">
                          +{clinic.services.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Opening Hours */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 font-inter">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {clinic.openingHours}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-primary text-white px-6 py-3 rounded-xl font-inter font-semibold hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/30 flex items-center justify-center shadow-lg">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </button>
                      <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-inter font-semibold hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300/30 flex items-center justify-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </button>
                      <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-inter font-semibold hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300/30 flex items-center justify-center">
                        <Heart className="w-4 h-4 mr-2" />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {sortedClinics.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-200">
              <Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-jakarta font-bold text-gray-600 mb-3">
                No clinics found
              </h3>
              <p className="text-gray-500 font-inter text-lg mb-6">
                Try adjusting your search criteria or location.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                  setSelectedLocation('all');
                  setSelectedSpecialty('all');
                  setSortBy('relevance');
                }}
                className="bg-primary text-white px-6 py-3 rounded-xl font-inter font-semibold hover:bg-primary/90 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ClinicSearchPage;