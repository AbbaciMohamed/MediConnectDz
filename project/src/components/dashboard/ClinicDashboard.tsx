import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, 
  MapPin, 
  Users, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Settings,
  CreditCard,
  FileText,
  Shield,
  BarChart3,
  DollarSign,
  Download,
  Eye,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Map,
  Phone,
  Mail,
  Globe,
  Award,
  Bell,
  Upload,
  Key,
  LogOut,
  Filter,
  Search,
  ExternalLink,
  QrCode,
  Smartphone,
  Monitor,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { ClinicProfile } from '../../types';

interface ClinicDashboardProps {
  clinic: ClinicProfile & { email: string; id: string };
}

const ClinicDashboard: React.FC<ClinicDashboardProps> = ({ clinic }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(clinic);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showInviteStaffModal, setShowInviteStaffModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const tabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: Building,
      subTabs: [
        { id: 'profile', label: 'Clinic Profile & Branding' },
        { id: 'hours', label: 'Operating Hours' }
      ]
    },
    { 
      id: 'services', 
      label: 'Services & Staff', 
      icon: Users,
      subTabs: [
        { id: 'catalog', label: 'Service Catalog' },
        { id: 'staff', label: 'Staff Directory' }
      ]
    },
    { 
      id: 'subscription', 
      label: 'Trial & Subscription', 
      icon: Award,
      subTabs: [
        { id: 'trial', label: 'Trial Status' },
        { id: 'plans', label: 'Plan Features' }
      ]
    },
    { 
      id: 'billing', 
      label: 'Payment & Billing', 
      icon: CreditCard,
      subTabs: [
        { id: 'methods', label: 'Payment Methods' },
        { id: 'invoices', label: 'Invoices & Statements' },
        { id: 'reports', label: 'Usage Reports' }
      ]
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3,
      subTabs: [
        { id: 'appointments', label: 'Appointment Metrics' },
        { id: 'feedback', label: 'Patient Feedback' },
        { id: 'inventory', label: 'Supply & Inventory' }
      ]
    },
    { 
      id: 'security', 
      label: 'Security Suite', 
      icon: Shield,
      subTabs: [
        { id: 'scans', label: 'Vulnerability Scans' },
        { id: 'audit', label: 'Audit Logs' },
        { id: 'compliance', label: 'Compliance Reports' }
      ]
    },
    { 
      id: 'account', 
      label: 'Account & Security', 
      icon: Settings,
      subTabs: [
        { id: 'profile', label: 'Admin Profile' },
        { id: 'password', label: 'Password & 2FA' },
        { id: 'sso', label: 'SSO Configuration' },
        { id: 'sessions', label: 'Active Sessions' }
      ]
    }
  ];

  // Mock data
  const mockServices = [
    { id: '1', name: 'General Consultation', description: 'Comprehensive health assessment', price: 5000, category: 'General Medicine' },
    { id: '2', name: 'Cardiology Consultation', description: 'Heart and cardiovascular assessment', price: 8000, category: 'Cardiology' },
    { id: '3', name: 'Laboratory Tests', description: 'Blood work and diagnostic tests', price: 3000, category: 'Laboratory' },
    { id: '4', name: 'X-Ray Imaging', description: 'Digital radiography services', price: 4500, category: 'Radiology' }
  ];

  const mockStaff = [
    { id: '1', name: 'Dr. Ahmed Benali', specialty: 'Cardiology', role: 'Doctor', status: 'Active', avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
    { id: '2', name: 'Dr. Fatima Cherif', specialty: 'General Medicine', role: 'Doctor', status: 'Active', avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
    { id: '3', name: 'Nurse Amina Boudiaf', specialty: 'Emergency Care', role: 'Nurse', status: 'Active', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
    { id: '4', name: 'Dr. Karim Mammeri', specialty: 'Pediatrics', role: 'Doctor', status: 'On Leave', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }
  ];

  const mockPaymentMethods = [
    { id: '1', type: 'card', brand: 'Visa', last4: '4242', isDefault: true, expiryMonth: 12, expiryYear: 2027 },
    { id: '2', type: 'card', brand: 'Mastercard', last4: '8888', isDefault: false, expiryMonth: 8, expiryYear: 2026 },
    { id: '3', type: 'bank', last4: '1234', isDefault: false }
  ];

  const mockInvoices = [
    { id: '1', date: '2025-01-01', amount: 199, status: 'paid', description: 'Pro Plan - January 2025' },
    { id: '2', date: '2024-12-01', amount: 199, status: 'paid', description: 'Pro Plan - December 2024' },
    { id: '3', date: '2025-02-01', amount: 199, status: 'pending', description: 'Pro Plan - February 2025' }
  ];

  const mockAnalytics = {
    appointments: { total: 156, growth: 12.5, noShows: 8 },
    satisfaction: { rating: 4.8, reviews: 89, growth: 5.2 },
    revenue: { thisMonth: 45000, growth: 8.3 },
    inventory: { lowStock: 3, criticalAlerts: 1 }
  };

  const mockSecurityScans = [
    { id: '1', date: '2025-01-10', type: 'Full Scan', status: 'completed', issues: 2, severity: 'medium' },
    { id: '2', date: '2025-01-03', type: 'Vulnerability', status: 'completed', issues: 0, severity: 'low' }
  ];

  const mockAuditLogs = [
    { id: '1', timestamp: '2025-01-15 14:30', user: 'Dr. Ahmed Benali', action: 'Login', details: 'Successful login from Chrome' },
    { id: '2', timestamp: '2025-01-15 14:25', user: 'Admin', action: 'Settings Changed', details: 'Updated operating hours' },
    { id: '3', timestamp: '2025-01-15 14:20', user: 'Dr. Fatima Cherif', action: 'Patient Access', details: 'Viewed patient record #12345' }
  ];

  const mockSessions = [
    { id: '1', device: 'Chrome on Windows', location: 'Algiers, Algeria', lastActive: 'Now', current: true },
    { id: '2', device: 'Safari on iPhone', location: 'Oran, Algeria', lastActive: '2 hours ago', current: false },
    { id: '3', device: 'Firefox on Mac', location: 'Constantine, Algeria', lastActive: '1 day ago', current: false }
  ];

  const getCurrentTab = () => tabs.find(tab => tab.id === activeTab);
  const getCurrentSubTab = () => getCurrentTab()?.subTabs?.find(sub => sub.id === activeSubTab);

  const renderTrialBanner = () => {
    if (clinic.subscription.type !== 'trial' || !clinic.trialEndsAt) return null;
    
    const daysLeft = Math.ceil((clinic.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    return (
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-yellow-600" />
            <div>
              <h3 className="font-jakarta font-semibold text-yellow-800">
                Free Trial - {daysLeft} days remaining
              </h3>
              <p className="text-yellow-700 font-inter text-sm">
                Upgrade now to continue accessing all premium features
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowUpgradeModal(true)}
            className="bg-primary text-white px-6 py-2 rounded-lg font-inter font-semibold hover:bg-primary/90 transition-colors"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    );
  };

  const renderOverviewProfile = () => (
    <div className="space-y-8">
      {/* Clinic Branding */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Clinic Profile & Branding</h3>
        
        <div className="space-y-8">
          {/* Logo Section */}
          <div>
            <h4 className="font-inter font-medium text-gray-900 mb-4">Clinic Logo</h4>
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-white text-2xl font-jakarta font-bold shadow-lg">
                {clinic.name.charAt(0)}
              </div>
              <div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Logo
                </button>
                <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 5MB. Recommended: 400x400px</p>
              </div>
            </div>
          </div>

          {/* Banner Section */}
          <div>
            <h4 className="font-inter font-medium text-gray-900 mb-4">Banner Image</h4>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary transition-colors">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="font-inter font-semibold text-gray-700 mb-2">Upload Banner Image</h4>
              <p className="text-sm text-gray-600 mb-4">Showcase your clinic with a professional banner (1200x400px recommended)</p>
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
                Choose Image
              </button>
            </div>
          </div>

          {/* Clinic Information */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-inter font-medium text-gray-900">Clinic Information</h4>
              <button className="text-primary hover:text-primary/80 font-inter font-medium flex items-center">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Details
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Clinic Name</label>
                <div className="flex items-center space-x-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <Building className="w-5 h-5 text-gray-400" />
                  <span className="font-inter text-gray-900">{clinic.name}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="flex items-center space-x-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="font-inter text-gray-900">{clinic.phone}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Email Address</label>
                <div className="flex items-center space-x-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="font-inter text-gray-900">{clinic.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Website</label>
                <div className="flex items-center space-x-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="font-inter text-gray-900">{clinic.website || 'Not provided'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Address & Map */}
          <div className="border-t border-gray-200 pt-8">
            <h4 className="font-inter font-medium text-gray-900 mb-4">Address & Location</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 py-3 px-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-inter text-gray-900">{clinic.address.street}</p>
                      <p className="font-inter text-gray-600">{clinic.address.city}, {clinic.address.zipCode}</p>
                      <p className="font-inter text-gray-600">{clinic.address.country}</p>
                    </div>
                  </div>
                  <button className="w-full bg-primary text-white py-3 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors flex items-center justify-center">
                    <Map className="w-4 h-4 mr-2" />
                    Update Location on Map
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-2xl p-8 text-center">
                <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="font-inter font-medium text-gray-600 mb-2">Interactive Map</h4>
                <p className="text-sm text-gray-500">
                  Click "Update Location" to adjust your clinic's position on the map
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOperatingHours = () => (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900">Operating Hours</h3>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(clinic.operatingHours).map(([day, hours]) => (
          <div key={day} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-24">
                <span className="font-inter font-medium text-gray-900 capitalize">{day}</span>
              </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={hours.isOpen}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="ml-2 text-sm font-inter text-gray-600">Open</span>
              </label>
            </div>
            
            {hours.isOpen ? (
              <div className="flex items-center space-x-3">
                <input
                  type="time"
                  value={hours.open}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  value={hours.close}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                />
              </div>
            ) : (
              <span className="text-gray-500 font-inter">Closed</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-inter font-semibold text-blue-900 mb-2">Operating Hours Tips</h4>
            <ul className="text-blue-800 font-inter text-sm space-y-1">
              <li>• These hours will be displayed to patients on your clinic profile</li>
              <li>• You can set different hours for each day of the week</li>
              <li>• Changes take effect immediately after saving</li>
              <li>• Consider lunch breaks when setting continuous hours</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServiceCatalog = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-jakarta font-semibold text-neutral-900">Service Catalog</h3>
          <button 
            onClick={() => setShowAddServiceModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockServices.map((service) => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="font-inter font-semibold text-gray-900 mb-2">{service.name}</h4>
                  <p className="text-gray-600 font-inter text-sm mb-3">{service.description}</p>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-inter font-medium">
                    {service.category}
                  </span>
                </div>
                <div className="text-right ml-4">
                  <p className="text-lg font-jakarta font-bold text-neutral-900">
                    {service.price.toLocaleString()} DZD
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                <button className="flex-1 text-primary hover:text-primary/80 font-inter font-medium text-sm">
                  Edit
                </button>
                <button className="flex-1 text-red-600 hover:text-red-700 font-inter font-medium text-sm">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStaffDirectory = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-jakarta font-semibold text-neutral-900">Staff Directory</h3>
          <button 
            onClick={() => setShowInviteStaffModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Invite Doctor/Nurse
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockStaff.map((staff) => (
            <div key={staff.id} className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="relative mb-4">
                <img
                  src={staff.avatar}
                  alt={staff.name}
                  className="w-16 h-16 rounded-full mx-auto object-cover border-4 border-gray-100"
                />
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                  staff.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
              </div>
              
              <h4 className="font-inter font-semibold text-gray-900 mb-1">{staff.name}</h4>
              <p className="text-primary font-inter text-sm mb-2">{staff.specialty}</p>
              <p className="text-gray-600 font-inter text-sm mb-4">{staff.role}</p>
              
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-inter font-medium ${
                staff.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {staff.status}
              </div>
              
              <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                <button className="flex-1 text-primary hover:text-primary/80 font-inter font-medium text-sm">
                  Edit
                </button>
                <button className="flex-1 text-gray-600 hover:text-gray-800 font-inter font-medium text-sm">
                  Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrialStatus = () => (
    <div className="space-y-6">
      {/* Trial Countdown */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
        <div className="text-center mb-8">
          <Award className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-jakarta font-bold text-green-800 mb-2">14-Day Free Trial</h3>
          <p className="text-green-700 font-inter text-lg">
            {clinic.trialEndsAt ? Math.ceil((clinic.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0} days remaining
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h4 className="font-jakarta font-semibold text-green-800 mb-2">Security Medicine Suite</h4>
            <p className="text-green-700 font-inter text-sm">Advanced security scanning and compliance</p>
          </div>
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h4 className="font-jakarta font-semibold text-green-800 mb-2">Analytics Dashboard</h4>
            <p className="text-green-700 font-inter text-sm">Detailed insights and performance metrics</p>
          </div>
          <div className="text-center">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h4 className="font-jakarta font-semibold text-green-800 mb-2">Premium Support</h4>
            <p className="text-green-700 font-inter text-sm">Priority support and training</p>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => setShowUpgradeModal(true)}
            className="bg-primary text-white px-8 py-4 rounded-xl font-inter font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            Upgrade to Pro Plan
          </button>
        </div>
      </div>
    </div>
  );

  const renderPlanFeatures = () => (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Plan Features Comparison</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 font-jakarta font-semibold text-gray-900">Feature</th>
              <th className="text-center py-4 px-4 font-jakarta font-semibold text-gray-600">Basic</th>
              <th className="text-center py-4 px-4 font-jakarta font-semibold text-primary bg-primary/5 rounded-t-lg">Pro (Current)</th>
              <th className="text-center py-4 px-4 font-jakarta font-semibold text-gray-600">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-4 px-4 font-inter">Patient Management</td>
              <td className="text-center py-4 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
              <td className="text-center py-4 px-4 bg-primary/5"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
              <td className="text-center py-4 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-4 px-4 font-inter">Security Medicine Suite</td>
              <td className="text-center py-4 px-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
              <td className="text-center py-4 px-4 bg-primary/5"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
              <td className="text-center py-4 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-4 px-4 font-inter">Advanced Analytics</td>
              <td className="text-center py-4 px-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
              <td className="text-center py-4 px-4 bg-primary/5"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
              <td className="text-center py-4 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-4 px-4 font-inter">API Access</td>
              <td className="text-center py-4 px-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
              <td className="text-center py-4 px-4 bg-primary/5"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
              <td className="text-center py-4 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 text-center">
        <button className="bg-primary text-white px-6 py-3 rounded-lg font-inter font-semibold hover:bg-primary/90 transition-colors">
          Request Enterprise Demo
        </button>
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900">Payment Methods</h3>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Payment Method
        </button>
      </div>
      
      <div className="space-y-4">
        {mockPaymentMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h4 className="font-inter font-medium text-gray-900">
                  {method.type === 'card' ? `${method.brand} ****${method.last4}` : `Bank ****${method.last4}`}
                </h4>
                <div className="flex items-center space-x-3">
                  {method.type === 'card' && (
                    <p className="text-sm text-gray-500">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                  )}
                  {method.isDefault && (
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-inter font-medium">
                      Default
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {!method.isDefault && (
                <button className="text-primary hover:text-primary/80 font-inter text-sm">
                  Set Default
                </button>
              )}
              <button className="text-red-600 hover:text-red-700 font-inter text-sm">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Invoices & Statements</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Date</th>
              <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Description</th>
              <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Amount</th>
              <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-100">
                <td className="py-3 px-4 font-inter">{invoice.date}</td>
                <td className="py-3 px-4 font-inter">{invoice.description}</td>
                <td className="py-3 px-4 font-inter">${invoice.amount}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-sm font-inter ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                    invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="text-primary hover:text-primary/80 font-inter text-sm">
                      <Download className="w-4 h-4" />
                    </button>
                    {invoice.status === 'pending' && (
                      <button className="text-primary hover:text-primary/80 font-inter text-sm">
                        Pay Now
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsageReports = () => (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Usage & Commission Reports</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 className="font-jakarta font-semibold text-neutral-900 mb-2">Transaction Fees</h4>
          <p className="text-2xl font-jakarta font-bold text-primary">$45.50</p>
          <p className="text-sm text-gray-600 font-inter">This month</p>
        </div>
        
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 className="font-jakarta font-semibold text-neutral-900 mb-2">API Usage</h4>
          <p className="text-2xl font-jakarta font-bold text-primary">1,250</p>
          <p className="text-sm text-gray-600 font-inter">Calls this month</p>
        </div>
        
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <Users className="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 className="font-jakarta font-semibold text-neutral-900 mb-2">Active Patients</h4>
          <p className="text-2xl font-jakarta font-bold text-primary">156</p>
          <p className="text-sm text-gray-600 font-inter">This month</p>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button className="bg-primary text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Download CSV Report
        </button>
        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-inter font-medium hover:bg-gray-50 transition-colors">
          Schedule Monthly Reports
        </button>
      </div>
    </div>
  );

  const renderAppointmentMetrics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">{mockAnalytics.appointments.total}</h4>
          <p className="text-gray-600 font-inter">Total Appointments</p>
          <p className="text-green-600 font-inter text-sm mt-1">+{mockAnalytics.appointments.growth}% this month</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <h4 className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">{mockAnalytics.appointments.total - mockAnalytics.appointments.noShows}</h4>
          <p className="text-gray-600 font-inter">Completed</p>
          <p className="text-green-600 font-inter text-sm mt-1">95% completion rate</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
          <h4 className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">{mockAnalytics.appointments.noShows}</h4>
          <p className="text-gray-600 font-inter">No-Shows</p>
          <p className="text-yellow-600 font-inter text-sm mt-1">5% no-show rate</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">${mockAnalytics.revenue.thisMonth.toLocaleString()}</h4>
          <p className="text-gray-600 font-inter">Revenue</p>
          <p className="text-green-600 font-inter text-sm mt-1">+{mockAnalytics.revenue.growth}% this month</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Appointment Trends</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-inter">Chart visualization would appear here</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatientFeedback = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
          <h4 className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">{mockAnalytics.satisfaction.rating}</h4>
          <p className="text-gray-600 font-inter">Average Rating</p>
          <div className="flex justify-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(mockAnalytics.satisfaction.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <Users className="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">{mockAnalytics.satisfaction.reviews}</h4>
          <p className="text-gray-600 font-inter">Total Reviews</p>
          <p className="text-green-600 font-inter text-sm mt-1">+{mockAnalytics.satisfaction.growth}% this month</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <h4 className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">98%</h4>
          <p className="text-gray-600 font-inter">Satisfaction Rate</p>
          <p className="text-green-600 font-inter text-sm mt-1">Excellent performance</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-jakarta font-semibold text-neutral-900">Recent Reviews</h3>
          <button className="text-primary hover:text-primary/80 font-inter font-medium">
            View All Reviews
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { name: 'Amina Boudiaf', rating: 5, comment: 'Excellent service and very professional staff. Highly recommended!', date: '2 days ago' },
            { name: 'Karim Benali', rating: 4, comment: 'Good experience overall. The waiting time was reasonable.', date: '1 week ago' },
            { name: 'Fatima Cherif', rating: 5, comment: 'Dr. Ahmed was very thorough and explained everything clearly.', date: '2 weeks ago' }
          ].map((review, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-jakarta font-bold text-primary">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-inter font-medium text-gray-900">{review.name}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500 font-inter">{review.date}</span>
              </div>
              <p className="text-gray-700 font-inter">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInventoryAlerts = () => (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Supply & Inventory Alerts</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
          <h4 className="font-jakarta font-semibold text-yellow-800 mb-2">Low Stock Items</h4>
          <p className="text-2xl font-jakarta font-bold text-yellow-600">{mockAnalytics.inventory.lowStock}</p>
          <p className="text-sm text-yellow-700 font-inter">Items need restocking</p>
        </div>
        
        <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-3" />
          <h4 className="font-jakarta font-semibold text-red-800 mb-2">Critical Alerts</h4>
          <p className="text-2xl font-jakarta font-bold text-red-600">{mockAnalytics.inventory.criticalAlerts}</p>
          <p className="text-sm text-red-700 font-inter">Immediate attention required</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg bg-yellow-50">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <div>
              <h4 className="font-inter font-medium text-yellow-800">Paracetamol 500mg</h4>
              <p className="text-sm text-yellow-700">Only 15 units remaining</p>
            </div>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
            Order Now
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <h4 className="font-inter font-medium text-red-800">Surgical Gloves</h4>
              <p className="text-sm text-red-700">Out of stock - Critical</p>
            </div>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-red-700 transition-colors">
            Emergency Order
          </button>
        </div>
      </div>
    </div>
  );

  const renderVulnerabilityScans = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-jakarta font-semibold text-neutral-900">Vulnerability Scans</h3>
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
            Run New Scan
          </button>
        </div>
        
        <div className="space-y-4">
          {mockSecurityScans.map((scan) => (
            <div key={scan.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-inter font-medium text-gray-900">{scan.type}</h4>
                  <p className="text-sm text-gray-600">{scan.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-sm font-inter ${
                    scan.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {scan.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-sm font-inter ${
                    scan.severity === 'low' ? 'bg-green-100 text-green-800' :
                    scan.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {scan.issues} issues
                  </span>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="text-primary hover:text-primary/80 font-inter text-sm">
                  View Details
                </button>
                <button className="text-primary hover:text-primary/80 font-inter text-sm">
                  Download Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAuditLogs = () => (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900">Audit Logs</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter text-sm">
            <option>All Users</option>
            <option>Doctors</option>
            <option>Nurses</option>
            <option>Admin</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-3">
        {mockAuditLogs.map((log) => (
          <div key={log.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <h4 className="font-inter font-medium text-gray-900">{log.action}</h4>
                <p className="text-sm text-gray-600">{log.details}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-inter font-medium text-gray-900">{log.user}</p>
              <p className="text-sm text-gray-500">{log.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComplianceReports = () => (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Compliance Reports</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-gray-50 rounded-lg">
          <FileText className="w-8 h-8 text-primary mb-4" />
          <h4 className="font-inter font-semibold text-gray-900 mb-2">HIPAA Compliance Report</h4>
          <p className="text-sm text-gray-600 mb-4">Latest compliance assessment and recommendations</p>
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
            Generate Report
          </button>
        </div>
        
        <div className="p-6 bg-gray-50 rounded-lg">
          <Shield className="w-8 h-8 text-primary mb-4" />
          <h4 className="font-inter font-semibold text-gray-900 mb-2">Security Assessment</h4>
          <p className="text-sm text-gray-600 mb-4">Comprehensive security review and audit</p>
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-inter font-semibold text-gray-900 mb-4">Automated Reports</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h5 className="font-inter font-medium text-gray-900">Monthly Compliance Summary</h5>
              <p className="text-sm text-gray-600">Automated monthly report via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdminProfile = () => (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900">Admin Profile</h3>
        <button className="text-primary hover:text-primary/80 font-inter font-medium flex items-center">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Profile
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Full Name</label>
          <div className="flex items-center space-x-3 py-3 px-4 bg-gray-50 rounded-lg">
            <User className="w-5 h-5 text-gray-400" />
            <span className="font-inter text-gray-900">Dr. Ahmed Benali</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Email Address</label>
          <div className="flex items-center space-x-3 py-3 px-4 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="font-inter text-gray-900">{clinic.email}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="flex items-center space-x-3 py-3 px-4 bg-gray-50 rounded-lg">
            <Phone className="w-5 h-5 text-gray-400" />
            <span className="font-inter text-gray-900">{clinic.phone}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Role</label>
          <div className="flex items-center space-x-3 py-3 px-4 bg-gray-50 rounded-lg">
            <Shield className="w-5 h-5 text-gray-400" />
            <span className="font-inter text-gray-900">Clinic Administrator</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPasswordSecurity = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Password & 2FA</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-inter font-medium text-gray-900 mb-4">Change Password</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                  placeholder="Confirm new password"
                />
              </div>
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
                Update Password
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-inter font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-6 h-6 text-gray-400" />
                <div>
                  <h5 className="font-inter font-medium text-gray-900">Authenticator App</h5>
                  <p className="text-sm text-gray-600">Use an authenticator app for 2FA</p>
                </div>
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
                Setup 2FA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSSOConfiguration = () => (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">SSO Configuration</h3>
      
      <div className="space-y-6">
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-inter font-semibold text-blue-900 mb-2">Enterprise Feature</h4>
              <p className="text-blue-800 font-inter text-sm">
                Single Sign-On (SSO) configuration is available for Enterprise plans. 
                Upgrade to enable SAML and OAuth integration for your organization.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">SAML Metadata URL</label>
            <input
              type="url"
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-inter"
              placeholder="https://your-idp.com/metadata"
            />
          </div>
          
          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">OAuth Client ID</label>
            <input
              type="text"
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-inter"
              placeholder="Enter OAuth Client ID"
            />
          </div>
          
          <button 
            disabled
            className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-inter font-medium cursor-not-allowed"
          >
            Test Connection
          </button>
        </div>
        
        <div className="text-center pt-4">
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
            Upgrade to Enterprise
          </button>
        </div>
      </div>
    </div>
  );

  const renderActiveSessions = () => (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Active Sessions</h3>
      
      <div className="space-y-4">
        {mockSessions.map((session) => (
          <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                {session.device.includes('iPhone') ? (
                  <Smartphone className="w-6 h-6 text-gray-600" />
                ) : (
                  <Monitor className="w-6 h-6 text-gray-600" />
                )}
              </div>
              <div>
                <h4 className="font-inter font-medium text-gray-900">{session.device}</h4>
                <p className="text-sm text-gray-600">{session.location}</p>
                <p className="text-sm text-gray-500">Last active: {session.lastActive}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {session.current && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-inter font-medium">
                  Current Session
                </span>
              )}
              {!session.current && (
                <button className="text-red-600 hover:text-red-700 font-inter font-medium text-sm flex items-center">
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button className="text-red-600 hover:text-red-700 font-inter font-medium">
          Logout All Other Sessions
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    const currentTab = getCurrentTab();
    const currentSubTab = getCurrentSubTab();
    
    if (!currentTab) return null;

    // If no subtab is selected, show the first one by default
    const subTabToShow = activeSubTab || (currentTab.subTabs?.[0]?.id || '');

    switch (activeTab) {
      case 'overview':
        switch (subTabToShow) {
          case 'profile': return renderOverviewProfile();
          case 'hours': return renderOperatingHours();
          default: return renderOverviewProfile();
        }
      case 'services':
        switch (subTabToShow) {
          case 'catalog': return renderServiceCatalog();
          case 'staff': return renderStaffDirectory();
          default: return renderServiceCatalog();
        }
      case 'subscription':
        switch (subTabToShow) {
          case 'trial': return renderTrialStatus();
          case 'plans': return renderPlanFeatures();
          default: return renderTrialStatus();
        }
      case 'billing':
        switch (subTabToShow) {
          case 'methods': return renderPaymentMethods();
          case 'invoices': return renderInvoices();
          case 'reports': return renderUsageReports();
          default: return renderPaymentMethods();
        }
      case 'analytics':
        switch (subTabToShow) {
          case 'appointments': return renderAppointmentMetrics();
          case 'feedback': return renderPatientFeedback();
          case 'inventory': return renderInventoryAlerts();
          default: return renderAppointmentMetrics();
        }
      case 'security':
        switch (subTabToShow) {
          case 'scans': return renderVulnerabilityScans();
          case 'audit': return renderAuditLogs();
          case 'compliance': return renderComplianceReports();
          default: return renderVulnerabilityScans();
        }
      case 'account':
        switch (subTabToShow) {
          case 'profile': return renderAdminProfile();
          case 'password': return renderPasswordSecurity();
          case 'sso': return renderSSOConfiguration();
          case 'sessions': return renderActiveSessions();
          default: return renderAdminProfile();
        }
      default:
        return renderOverviewProfile();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-jakarta font-bold text-neutral-900 mb-2">
            {clinic.name} Dashboard
          </h1>
          <p className="text-gray-600 font-inter">
            Manage your clinic, track performance, and grow your practice.
          </p>
        </div>

        {/* Trial Banner */}
        {renderTrialBanner()}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-8">
              <nav className="p-6">
                {tabs.map((tab) => (
                  <div key={tab.id} className="mb-2">
                    <button
                      onClick={() => {
                        setActiveTab(tab.id);
                        setActiveSubTab(tab.subTabs?.[0]?.id || '');
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <tab.icon className="w-5 h-5" />
                        <span className="font-inter font-medium">{tab.label}</span>
                      </div>
                      {tab.subTabs && (
                        <ChevronRight className={`w-4 h-4 transition-transform ${
                          activeTab === tab.id ? 'rotate-90' : ''
                        }`} />
                      )}
                    </button>
                    
                    {/* Sub-navigation */}
                    {activeTab === tab.id && tab.subTabs && (
                      <div className="mt-2 ml-4 space-y-1">
                        {tab.subTabs.map((subTab) => (
                          <button
                            key={subTab.id}
                            onClick={() => setActiveSubTab(subTab.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg text-sm font-inter transition-colors ${
                              activeSubTab === subTab.id
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {subTab.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={`${activeTab}-${activeSubTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals would go here */}
      {showAddServiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-jakarta font-bold mb-4">Add New Service</h3>
            <p className="text-gray-600 font-inter mb-6">Service creation modal would appear here</p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowAddServiceModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-inter font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 bg-primary text-white py-2 rounded-lg font-inter font-medium">
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicDashboard;