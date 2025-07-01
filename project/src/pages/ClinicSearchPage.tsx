import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Star, Clock, Phone, Navigation, Heart, Shield, Award, Users, ChevronDown, SlidersHorizontal, X, Menu, Filter } from 'lucide-react';
import { Search, MapPin, Calendar, Star, Clock, Phone, Navigation, Heart, Shield, Award, Users, ChevronDown, SlidersHorizontal, X, Menu, Filter } from 'lucide-react';

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
    openingHours: '24/7',
    bookedAppointments: [
      { patientName: 'Amina Boudiaf', date: '2024-07-10 10:00', status: 'upcoming' },
      { patientName: 'Karim Benali', date: '2024-07-11 14:30', status: 'upcoming' }
    ]
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
    openingHours: '8:00 AM - 6:00 PM',
    bookedAppointments: [
      { patientName: 'Fatima Cherif', date: '2024-07-12 09:00', status: 'upcoming' }
    ]
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

type Clinic = typeof mockClinics[number];

const ClinicSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [isLocationDetecting, setIsLocationDetecting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [contactModal, setContactModal] = useState<{ open: boolean; clinic: Clinic | null }>({ open: false, clinic: null });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSaved, setIsSaved] = useState<Record<number, boolean>>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
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
    openingHours: '24/7',
    bookedAppointments: [
      { patientName: 'Amina Boudiaf', date: '2024-07-10 10:00', status: 'upcoming' },
      { patientName: 'Karim Benali', date: '2024-07-11 14:30', status: 'upcoming' }
    ]
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
    openingHours: '8:00 AM - 6:00 PM',
    bookedAppointments: [
      { patientName: 'Fatima Cherif', date: '2024-07-12 09:00', status: 'upcoming' }
    ]
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

type Clinic = typeof mockClinics[number];

const ClinicSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [isLocationDetecting, setIsLocationDetecting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [contactModal, setContactModal] = useState<{ open: boolean; clinic: Clinic | null }>({ open: false, clinic: null });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSaved, setIsSaved] = useState<Record<number, boolean>>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(false);

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
      setSearchQuery('Clinics near you');
      setSuggestions([]);
      setIsLocationDetecting(false);
    }, 1500);
  };

  const filteredClinics = clinics.filter(clinic => {
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

  const handleSave = (clinicId: number) => {
    setIsSaved(prev => ({
      ...prev,
      [clinicId]: !prev[clinicId]
    }));
  };

  const fetchClinics = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/clinics');
      if (!res.ok) {
        console.error('Failed to fetch clinics:', res.statusText);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setClinics(data);
      console.log('Clinics fetched successfully:', data);
    } catch (err) {
      console.error('Error fetching clinics:', err);
    }
    setLoading(false);
  };

  const fetchFilteredClinics = async (filters) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/clinics?${query}`);
      if (!res.ok) {
        console.error('Failed to fetch clinics:', res.statusText);
        return;
      }
      const data = await res.json();
      setClinics(data);
      console.log('Clinics fetched successfully:', data);
    } catch (err) {
      console.error('Error fetching clinics:', err);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-x-hidden">
      {/* Floating background elements */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl animate-pulse-slow z-0" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-100/40 rounded-full blur-2xl animate-float z-0" />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-teal-100/30 rounded-full blur-xl animate-pulse z-0" />

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-x-hidden">
      {/* Floating background elements */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl animate-pulse-slow z-0" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-100/40 rounded-full blur-2xl animate-float z-0" />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-teal-100/30 rounded-full blur-xl animate-pulse z-0" />

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
      <section className="relative py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 relative z-10"
            className="text-center mb-12 relative z-10"
          >
            <motion.div 
              className="inline-flex items-center bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
            <motion.div 
              className="inline-flex items-center bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <MapPin className="w-4 h-4 mr-2" />
              500+ verified clinics • Real-time availability
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Find the Best Healthcare <span className="text-blue-600">Near You</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Search for clinics, specialists, and healthcare services in your area with real-time availability and verified providers.
            </motion.p>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Find the Best Healthcare <span className="text-blue-600">Near You</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Search for clinics, specialists, and healthcare services in your area with real-time availability and verified providers.
            </motion.p>
          </motion.div>

          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden focus-within:ring-4 focus-within:ring-blue-200 transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden focus-within:ring-4 focus-within:ring-blue-200 transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search clinics, specialties, locations..."
                    placeholder="Search clinics, specialties, locations..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-16 pr-4 py-5 text-lg focus:outline-none focus:ring-0 border-0 placeholder-gray-500 bg-transparent"
                    className="w-full pl-16 pr-4 py-5 text-lg focus:outline-none focus:ring-0 border-0 placeholder-gray-500 bg-transparent"
                  />
                </div>
                <div className="flex border-t lg:border-t-0 lg:border-l border-gray-200">
                  <button
                    onClick={detectLocation}
                    disabled={isLocationDetecting}
                    className="bg-blue-600 text-white px-8 py-5 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center disabled:opacity-50 min-w-[140px]"
                    className="bg-blue-600 text-white px-8 py-5 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center disabled:opacity-50 min-w-[140px]"
                  >
                    {isLocationDetecting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Navigation className="w-5 h-5" />
                      <Navigation className="w-5 h-5" />
                    )}
                    <span className="ml-3 font-medium hidden sm:block">
                    <span className="ml-3 font-medium hidden sm:block">
                      {isLocationDetecting ? 'Locating...' : 'Near Me'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Autocomplete suggestions */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 bg-white"
                  >
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setSuggestions([]);
                        }}
                        className="w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors duration-200 flex items-center border-b border-gray-100 last:border-b-0 text-gray-700"
                        className="w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors duration-200 flex items-center border-b border-gray-100 last:border-b-0 text-gray-700"
                      >
                        <Search className="w-4 h-4 mr-4 text-gray-400" />
                        <span>{suggestion}</span>
                        <Search className="w-4 h-4 mr-4 text-gray-400" />
                        <span>{suggestion}</span>
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
          {/* Mobile filter button */}
          <div className="lg:hidden mb-6 flex justify-end">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter sidebar */}
            <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                  <button 
                    onClick={() => setMobileFiltersOpen(false)}
                    className="lg:hidden text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Filters</h4>
                    <div className="space-y-3">
                      {filters.map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() => setSelectedFilter(filter.id)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center ${
                            selectedFilter === filter.id
                              ? 'bg-blue-100 text-blue-700 border border-blue-200'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <filter.icon className={`w-4 h-4 mr-3 ${selectedFilter === filter.id ? 'text-blue-600' : 'text-gray-500'}`} />
                          {filter.label}
                          <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
                            selectedFilter === filter.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {filter.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Location</h4>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    >
                      {locations.map(location => (
                        <option key={location.id} value={location.id}>
                          {location.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Specialty</h4>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    >
                      {specialties.map(specialty => (
                        <option key={specialty.id} value={specialty.id}>
                          {specialty.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Sort By</h4>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    >
                      {sortOptions.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedLocation('all');
                      setSelectedSpecialty('all');
                      setSortBy('relevance');
                      setSelectedFilter('all');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          {/* Mobile filter button */}
          <div className="lg:hidden mb-6 flex justify-end">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter sidebar */}
            <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                  <button 
                    onClick={() => setMobileFiltersOpen(false)}
                    className="lg:hidden text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Filters</h4>
                    <div className="space-y-3">
                      {filters.map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() => setSelectedFilter(filter.id)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center ${
                            selectedFilter === filter.id
                              ? 'bg-blue-100 text-blue-700 border border-blue-200'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <filter.icon className={`w-4 h-4 mr-3 ${selectedFilter === filter.id ? 'text-blue-600' : 'text-gray-500'}`} />
                          {filter.label}
                          <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
                            selectedFilter === filter.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {filter.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Location</h4>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    >
                      {locations.map(location => (
                        <option key={location.id} value={location.id}>
                          {location.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Specialty</h4>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    >
                      {specialties.map(specialty => (
                        <option key={specialty.id} value={specialty.id}>
                          {specialty.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Sort By</h4>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    >
                      {sortOptions.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedLocation('all');
                      setSelectedSpecialty('all');
                      setSortBy('relevance');
                      setSelectedFilter('all');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {sortedClinics.length} clinics found
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Showing results for "{searchQuery || 'all clinics'}"
                  </p>
                </div>
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full flex items-center">
                  <span>Sorted by {sortOptions.find(opt => opt.id === sortBy)?.label.toLowerCase()}</span>
                </div>
              </div>
            {/* Main content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {sortedClinics.length} clinics found
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Showing results for "{searchQuery || 'all clinics'}"
                  </p>
                </div>
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full flex items-center">
                  <span>Sorted by {sortOptions.find(opt => opt.id === sortBy)?.label.toLowerCase()}</span>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {sortedClinics.map((clinic, index) => (
                  <motion.div
                    key={clinic.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
                  >
                    <div className="relative">
                      {/* Clinic Image */}
                      <div className="h-48 overflow-hidden">
                        <img
                          src={clinic.image}
                          alt={clinic.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
                        {clinic.isFeatured && (
                          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                            <Award className="w-3 h-3 mr-1" />
                            FEATURED
                          </div>
                        )}
                        {clinic.isEmergency && (
                          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg animate-pulse">
                            <Clock className="w-3 h-3 mr-1" />
                            Emergency
                          </div>
                        )}
                      </div>
                      
                      <div className="absolute bottom-4 right-4">
                        {clinic.isOpen ? (
                          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                            <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                            Open
                          </div>
                        ) : (
                          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                            Closed
                          </div>
                        )}
                      </div>
                    </div>
              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {sortedClinics.map((clinic, index) => (
                  <motion.div
                    key={clinic.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
                  >
                    <div className="relative">
                      {/* Clinic Image */}
                      <div className="h-48 overflow-hidden">
                        <img
                          src={clinic.image}
                          alt={clinic.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
                        {clinic.isFeatured && (
                          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                            <Award className="w-3 h-3 mr-1" />
                            FEATURED
                          </div>
                        )}
                        {clinic.isEmergency && (
                          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg animate-pulse">
                            <Clock className="w-3 h-3 mr-1" />
                            Emergency
                          </div>
                        )}
                      </div>
                      
                      <div className="absolute bottom-4 right-4">
                        {clinic.isOpen ? (
                          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                            <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                            Open
                          </div>
                        ) : (
                          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                            Closed
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Clinic Info */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="text-xl font-bold text-gray-900">
                              {clinic.name}
                            </h3>
                            {clinic.isVerified && (
                              <Shield className="w-5 h-5 text-blue-500 ml-2" />
                            )}
                          </div>
                          <p className="text-blue-600 font-medium mb-1">{clinic.specialty}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {clinic.address}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900 mb-1">
                            {clinic.price}
                    {/* Clinic Info */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="text-xl font-bold text-gray-900">
                              {clinic.name}
                            </h3>
                            {clinic.isVerified && (
                              <Shield className="w-5 h-5 text-blue-500 ml-2" />
                            )}
                          </div>
                          <p className="text-blue-600 font-medium mb-1">{clinic.specialty}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {clinic.address}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900 mb-1">
                            {clinic.price}
                          </div>
                          <div className="text-xs text-gray-500">Starting from</div>
                          <div className="text-xs text-gray-500">Starting from</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-semibold">{clinic.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">({clinic.reviewCount})</span>

                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-semibold">{clinic.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">({clinic.reviewCount})</span>
                        </div>
                        <div className="text-sm text-gray-600">{clinic.distance}</div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {clinic.waitTime}
                        </div>
                      </div>
                        <div className="text-sm text-gray-600">{clinic.distance}</div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {clinic.waitTime}
                        </div>
                      </div>

                      {/* Services */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {clinic.services.slice(0, 3).map((service, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs"
                          >
                            {service}
                          </span>
                        ))}
                        {clinic.services.length > 3 && (
                          <span className="text-xs text-gray-500 px-2.5 py-1">
                            +{clinic.services.length - 3} more
                          </span>
                        )}
                      </div>
                      {/* Services */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {clinic.services.slice(0, 3).map((service, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs"
                          >
                            {service}
                          </span>
                        ))}
                        {clinic.services.length > 3 && (
                          <span className="text-xs text-gray-500 px-2.5 py-1">
                            +{clinic.services.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Opening Hours */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {clinic.openingHours}
                        </p>
                      </div>
                      {/* Opening Hours */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {clinic.openingHours}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setShowLoginModal(true)}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center justify-center"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book
                        </button>
                        <button
                          onClick={() => setContactModal({ open: true, clinic })}
                          className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </button>
                        <button
                          onClick={() => handleSave(clinic.id)}
                          className={`px-4 py-2.5 border rounded-lg font-medium flex items-center justify-center transition-colors ${
                            isSaved[clinic.id] 
                              ? 'bg-pink-50 text-pink-600 border-pink-300' 
                              : 'border-gray-300 text-gray-700 hover:bg-pink-50'
                          }`}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${isSaved[clinic.id] ? 'fill-current' : ''}`} />
                          Save
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setShowLoginModal(true)}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center justify-center"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book
                        </button>
                        <button
                          onClick={() => setContactModal({ open: true, clinic })}
                          className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </button>
                        <button
                          onClick={() => handleSave(clinic.id)}
                          className={`px-4 py-2.5 border rounded-lg font-medium flex items-center justify-center transition-colors ${
                            isSaved[clinic.id] 
                              ? 'bg-pink-50 text-pink-600 border-pink-300' 
                              : 'border-gray-300 text-gray-700 hover:bg-pink-50'
                          }`}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${isSaved[clinic.id] ? 'fill-current' : ''}`} />
                          Save
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* No Results */}
              {sortedClinics.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-lg flex flex-col items-center">
                  <div className="mb-8">
                    <Search className="w-24 h-24 text-blue-300 mx-auto mb-2" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-3">
                    No clinics found
                  </h3>
                  <p className="text-gray-500 text-lg mb-6">
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
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
              {/* No Results */}
              {sortedClinics.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-lg flex flex-col items-center">
                  <div className="mb-8">
                    <Search className="w-24 h-24 text-blue-300 mx-auto mb-2" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-3">
                    No clinics found
                  </h3>
                  <p className="text-gray-500 text-lg mb-6">
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
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactModal.open && contactModal.clinic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setContactModal({ open: false, clinic: null })}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 text-xl font-bold focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center mb-4">
                <img 
                  src={contactModal.clinic.image} 
                  alt={contactModal.clinic.name} 
                  className="w-16 h-16 rounded-xl object-cover border-2 border-blue-200 mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{contactModal.clinic.name}</h3>
                  <div className="text-blue-600 font-medium">{contactModal.clinic.specialty}</div>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href={`tel:${contactModal.clinic.phone}`} className="font-medium text-gray-900 hover:text-blue-600">
                      {contactModal.clinic.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">{contactModal.clinic.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Opening Hours</p>
                    <p className="font-medium text-gray-900">{contactModal.clinic.openingHours}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <a
                  href={`tel:${contactModal.clinic.phone}`}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
                <button
                  onClick={() => setContactModal({ open: false, clinic: null })}
                  className="flex-1 border border-gray-300 text-gray-700 rounded-lg font-medium px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 text-xl font-bold focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center mb-6">
                <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Login to Your Account</h2>
                <p className="text-gray-600 mt-2">Book appointments and manage your health</p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg"
                >
                  Sign In
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="#" className="text-blue-600 font-medium hover:text-blue-800">
                    Sign up
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactModal.open && contactModal.clinic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setContactModal({ open: false, clinic: null })}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 text-xl font-bold focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center mb-4">
                <img 
                  src={contactModal.clinic.image} 
                  alt={contactModal.clinic.name} 
                  className="w-16 h-16 rounded-xl object-cover border-2 border-blue-200 mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{contactModal.clinic.name}</h3>
                  <div className="text-blue-600 font-medium">{contactModal.clinic.specialty}</div>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href={`tel:${contactModal.clinic.phone}`} className="font-medium text-gray-900 hover:text-blue-600">
                      {contactModal.clinic.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">{contactModal.clinic.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Opening Hours</p>
                    <p className="font-medium text-gray-900">{contactModal.clinic.openingHours}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <a
                  href={`tel:${contactModal.clinic.phone}`}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
                <button
                  onClick={() => setContactModal({ open: false, clinic: null })}
                  className="flex-1 border border-gray-300 text-gray-700 rounded-lg font-medium px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 text-xl font-bold focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center mb-6">
                <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Login to Your Account</h2>
                <p className="text-gray-600 mt-2">Book appointments and manage your health</p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg"
                >
                  Sign In
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="#" className="text-blue-600 font-medium hover:text-blue-800">
                    Sign up
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClinicSearchPage;