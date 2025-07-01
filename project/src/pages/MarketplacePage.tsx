import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Calendar, DollarSign, FileText, Building, Award, TrendingUp, Users, Star, CheckCircle } from 'lucide-react';
import { Tender } from '../types';

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  // Backend tenders state
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch tenders from backend
  React.useEffect(() => {
    const fetchTenders = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/tenders');
        if (!res.ok) {
          setError('Failed to load tenders.');
          console.error('Failed to fetch tenders:', res.statusText);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setTenders(data);
        console.log('Tenders fetched successfully:', data);
      } catch (err) {
        setError('Failed to load tenders.');
        console.error('Error fetching tenders:', err);
      }
      setLoading(false);
    };
    fetchTenders();
  }, []);
    // Removed mock data block that caused syntax error
  // All mock tender data removed for production backend-driven state

  const categories = React.useMemo(() => {
    const cats = [
      'Medical Equipment',
      'Pharmaceuticals',
      'Laboratory Services',
      'Technology Solutions',
      'Environmental Services',
      'Medical Supplies',
    ];
    return [
      { id: 'all', label: 'All Categories', count: tenders.length },
      ...cats.map(cat => ({ id: cat, label: cat, count: tenders.filter(t => t.category === cat).length }))
    ];
  }, [tenders]);

  const regions = [
    { id: 'all', label: 'All Regions' },
    { id: 'Algiers', label: 'Algiers' },
    { id: 'Oran', label: 'Oran' },
    { id: 'Constantine', label: 'Constantine' },
    { id: 'Annaba', label: 'Annaba' },
    { id: 'Blida', label: 'Blida' },
    { id: 'Tlemcen', label: 'Tlemcen' }
  ];

  const statusOptions = [
    { id: 'all', label: 'All Status' },
    { id: 'open', label: 'Open for Applications' },
    { id: 'closing_soon', label: 'Closing Soon' },
    { id: 'high_value', label: 'High Value (>$100k)' }
  ];

  const sortOptions = [
    { id: 'deadline', label: 'Deadline (Earliest First)' },
    { id: 'value', label: 'Value (Highest First)' },
    { id: 'created', label: 'Recently Posted' },
    { id: 'urgency', label: 'Urgency Level' }
  ];

  const filteredTenders = tenders;

  // Sort tenders (basic, since backend should return sorted by deadline by default)
  const sortedTenders = filteredTenders;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Example function to apply to a tender
  const applyToTender = async (tenderId: string, supplierId: string) => {
    try {
      const res = await fetch(`/api/tenders/${tenderId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supplierId })
      });
      if (!res.ok) {
        console.error('Failed to apply to tender:', res.statusText);
        return;
      }
      console.log('Applied to tender successfully:', tenderId);
      // Update state or UI as needed
    } catch (err) {
      console.error('Error applying to tender:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {loading ? <p>Loading tenders...</p> : error ? <p className="text-red-500">{error}</p> : (
        <>
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
              <Package className="w-4 h-4 mr-2" />
              Healthcare Marketplace • Connect with providers
            </div>
            <h1 className="text-4xl md:text-6xl font-jakarta font-bold text-neutral-900 mb-6">
              Healthcare Marketplace
            </h1>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Connect with healthcare providers seeking medical supplies, equipment, and services. 
              Browse active tenders, submit proposals, and grow your business in the healthcare sector.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">$2.5M+</div>
              <div className="text-sm text-gray-600 font-inter">Total Contract Value</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <Building className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">150+</div>
              <div className="text-sm text-gray-600 font-inter">Healthcare Providers</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">300+</div>
              <div className="text-sm text-gray-600 font-inter">Verified Suppliers</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">95%</div>
              <div className="text-sm text-gray-600 font-inter">Success Rate</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 mb-12 shadow-xl border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tenders, equipment, services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter text-lg"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <select title="Category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter text-lg"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <select title="Region"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter text-lg"
                >
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>
                      {region.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <select title="Status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter text-lg"
                >
                  {statusOptions.map(status => (
                    <option key={status.id} value={status.id}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-1">
                <select title="Sort By"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter text-lg"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-jakarta font-bold text-neutral-900">
              {sortedTenders.length} active tenders
            </h2>
            <div className="text-sm text-gray-600 font-inter bg-gray-100 px-3 py-1 rounded-full">
              Sorted by {sortOptions.find(opt => opt.id === sortBy)?.label.toLowerCase()}
            </div>
          </div>

          {/* Tender Listings */}
          <div className="space-y-8">
            {sortedTenders.map((tender, index) => (
              <motion.div
                key={tender.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Background gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-2xl group-hover:opacity-75 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-inter font-semibold">
                          {tender.category}
                        </span>
                        <span className={`ml-3 px-3 py-1 rounded-full text-sm font-inter font-semibold border ${
                          getDaysUntilDeadline(tender.deadline) <= 7 
                            ? 'bg-red-100 text-red-800 border-red-200' 
                            : getDaysUntilDeadline(tender.deadline) <= 14
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            : 'bg-green-100 text-green-800 border-green-200'
                        }`}>
                          {getDaysUntilDeadline(tender.deadline)} days left
                        </span>
                        <span className={`ml-3 px-3 py-1 rounded-full text-sm font-inter font-semibold border ${
                          getUrgencyColor(tender.urgency)
                        }`}>
                          {tender.urgency} priority
                        </span>
                      </div>
                      <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors duration-300">
                        {tender.title}
                      </h3>
                      <p className="text-gray-600 font-inter leading-relaxed mb-6 text-lg">
                        {tender.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="w-5 h-5 mr-3 text-primary" />
                      <div>
                        <p className="font-inter font-medium text-gray-900">{tender.clinicName}</p>
                        <p className="text-gray-500">{tender.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-5 h-5 mr-3 text-primary" />
                      <div>
                        <p className="font-inter font-medium text-gray-900">
                          {tender.deadline.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-gray-500">Application deadline</p>
                      </div>
                    </div>
                    
                    {(tender.budget || tender.estimatedValue) && (
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <p className="font-inter font-medium text-gray-900">
                            {formatCurrency(tender.budget || tender.estimatedValue || 0)}
                          </p>
                          <p className="text-gray-500">Estimated budget</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="w-5 h-5 mr-3 text-primary" />
                      <div>
                        <p className="font-inter font-medium text-gray-900">
                          {tender.requirements.length} requirements
                        </p>
                        <p className="text-gray-500">Application criteria</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-jakarta font-semibold text-neutral-900 mb-3">
                      Key Requirements:
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {tender.requirements.slice(0, 6).map((req, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="font-inter">{req}</span>
                        </div>
                      ))}
                      {tender.requirements.length > 6 && (
                        <div className="text-sm text-gray-500 font-inter px-3 py-1">
                          +{tender.requirements.length - 6} more requirements
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-inter font-semibold text-gray-900 mb-2">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Contact Person:</span>
                        <span className="ml-2 font-medium text-gray-900">{tender.contactPerson}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Submission Deadline:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {tender.submissionDeadline ? new Date(tender.submissionDeadline).toLocaleDateString() : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Evaluation Criteria */}
                  {tender.evaluationCriteria && (
                    <div className="mb-6">
                      <h4 className="text-lg font-jakarta font-semibold text-neutral-900 mb-3">
                        Evaluation Criteria:
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {tender.evaluationCriteria?.map((criteria: string, idx: number) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                            <span className="font-inter">{criteria}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => applyToTender(tender.id, 'supplierId')} className="flex-1 bg-primary text-white px-8 py-4 rounded-xl font-inter font-semibold hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/30 shadow-lg">
                      Apply Now
                    </button>
                    <button className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl font-inter font-semibold hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300/30">
                      View Details
                    </button>
                    <button className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl font-inter font-semibold hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300/30">
                      Save Tender
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {sortedTenders.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-lg"
            >
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-jakarta font-bold text-gray-600 mb-3">
                No tenders found
              </h3>
              <p className="text-gray-500 font-inter text-lg mb-6">
                Try adjusting your search criteria or check back later for new opportunities.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedRegion('all');
                  setSelectedStatus('all');
                  setSortBy('deadline');
                }}
                className="bg-primary text-white px-6 py-3 rounded-xl font-inter font-semibold hover:bg-primary/90 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}

          {/* Call to Action for Suppliers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-jakarta font-bold mb-4">
                Ready to Grow Your Business?
              </h3>
              <p className="text-lg md:text-xl font-inter mb-8 opacity-90 max-w-2xl mx-auto">
                Join our network of trusted suppliers and access exclusive healthcare tenders across Algeria. 
                Connect with leading healthcare providers and expand your market reach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="bg-white text-primary px-8 py-4 rounded-xl font-inter font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
                  onClick={async () => {
                    try {
                      // Example: apply to the first open tender
                      const openTender = tenders.find(t => t.status === 'open');
                      if (!openTender) return alert('No open tenders available.');
                      const res = await fetch(`/api/tenders/${openTender.id}/apply`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ supplierId: 'demo-supplier' }) });
                      if (res.ok) alert('Applied successfully!');
                      else alert('Failed to apply.');
                    } catch {
                      alert('Error applying to tender.');
                    }
                  }}
                >
                  Become a Supplier
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-inter font-semibold text-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white/30">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
        </>
      )}
    </div>
  );
};

export default MarketplacePage;