import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  MapPin, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Settings,
  CreditCard,
  FileText,
  Shield,
  BarChart3,
  Download,
  Eye,
  Edit3,
  Save,
  X,
  Map,
  Phone,
  Mail,
  Globe,
  Award
} from 'lucide-react';
import { ClinicProfile, SecurityScan, Invoice, PaymentMethod } from '../../types';

interface EnhancedClinicProfileProps {
  clinic: ClinicProfile & { email: string; id: string };
}

const EnhancedClinicProfile: React.FC<EnhancedClinicProfileProps> = ({ clinic }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(clinic);

  const tabs = [
    { id: 'overview', label: 'Clinic Overview', icon: Building },
    { id: 'services', label: 'Services & Staff', icon: Users },
    { id: 'subscription', label: 'Trial & Subscription', icon: Award },
    { id: 'billing', label: 'Payment & Billing', icon: CreditCard },
    { id: 'analytics', label: 'Clinic Analytics', icon: BarChart3 },
    { id: 'security', label: 'Security Medicine Suite', icon: Shield },
    { id: 'account', label: 'Account & Security', icon: Settings }
  ];

  // const [analytics, setAnalytics] = useState<any>(null); // Not used currently

// Remove unused icon imports to fix TS errors
// Removed: Calendar, TrendingUp, Clock, Star, DollarSign, Plus, Trash2, Bell
  const [securityScans, setSecurityScans] = useState<SecurityScan[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch security scans
        const resScans = await fetch(`/api/clinics/${clinic.id}/security-scans`, { credentials: 'include' });
        if (resScans.ok) {
          setSecurityScans(await resScans.json());
        }

        // Fetch invoices
        const resInvoices = await fetch(`/api/clinics/${clinic.id}/invoices`, { credentials: 'include' });
        if (resInvoices.ok) {
          setInvoices(await resInvoices.json());
        }

        // Fetch payment methods
        const resPayments = await fetch(`/api/clinics/${clinic.id}/payment-methods`, { credentials: 'include' });
        if (resPayments.ok) {
          setPaymentMethods(await resPayments.json());
        }
      } catch (err) {
        setError((err as Error).message || 'Error loading data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [clinic.id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/profile/${editData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to update profile');
    setIsEditing(false);
      alert('Profile updated successfully!');
    } catch {
      alert('Error updating profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditData(clinic);
    setIsEditing(false);
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Trial Status */}
      {clinic.subscription.type === 'trial' && clinic.trialEndsAt && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-jakarta font-semibold text-yellow-800 mb-2">
                Free Trial Active
              </h3>
              <p className="text-yellow-700 font-inter">
                Your trial ends in {Math.ceil((clinic.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days.
                Upgrade now to continue accessing all features.
              </p>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-inter font-semibold hover:bg-primary/90 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Clinic Logo & Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Clinic Branding</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-inter font-medium text-gray-900 mb-3">Logo</h4>
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-white text-2xl font-jakarta font-bold">
                {clinic.name.charAt(0)}
              </div>
              <div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
                  Upload Logo
                </button>
                <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-inter font-medium text-gray-900 mb-3">Banner Image</h4>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary transition-colors">
              <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Building className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="font-inter font-semibold text-gray-700 mb-2">Upload Banner Image</h4>
              <p className="text-sm text-gray-600 mb-4">Showcase your clinic with a professional banner</p>
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
                Choose Image
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clinic Details */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-jakarta font-semibold text-neutral-900">Clinic Information</h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span className="font-inter font-medium">Edit</span>
            </button>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-inter font-medium hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Clinic Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.name || ''}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
              />
            ) : (
              <div className="flex items-center space-x-3 py-3">
                <Building className="w-5 h-5 text-gray-400" />
                <span className="font-inter text-gray-900">{clinic.name}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.phone || ''}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
              />
            ) : (
              <div className="flex items-center space-x-3 py-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="font-inter text-gray-900">{clinic.phone}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Email Address</label>
            <div className="flex items-center space-x-3 py-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="font-inter text-gray-900">{clinic.email}</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Read-only</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Website</label>
            {isEditing ? (
              <input
                type="url"
                value={editData.website || ''}
                onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                placeholder="https://clinic.com"
              />
            ) : (
              <div className="flex items-center space-x-3 py-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <span className="font-inter text-gray-900">{clinic.website || 'Not provided'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="mt-8">
          <h4 className="text-lg font-jakarta font-semibold text-neutral-900 mb-4">Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Street Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.address?.street || ''}
                  onChange={(e) => setEditData({ 
                    ...editData, 
                    address: { ...editData.address, street: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                />
              ) : (
                <div className="flex items-center space-x-3 py-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="font-inter text-gray-900">{clinic.address.street}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-inter font-medium text-gray-700 mb-2">City</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.address?.city || ''}
                  onChange={(e) => setEditData({ 
                    ...editData, 
                    address: { ...editData.address, city: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                />
              ) : (
                <div className="flex items-center space-x-3 py-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="font-inter text-gray-900">{clinic.address.city}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Postal Code</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.address?.zipCode || ''}
                  onChange={(e) => setEditData({ 
                    ...editData, 
                    address: { ...editData.address, zipCode: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                />
              ) : (
                <div className="flex items-center space-x-3 py-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="font-inter text-gray-900">{clinic.address.zipCode}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="mt-8">
          <h4 className="text-lg font-jakarta font-semibold text-neutral-900 mb-4">Location Map</h4>
          <div className="bg-gray-100 rounded-2xl p-8 text-center">
            <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="font-inter font-medium text-gray-600 mb-2">Interactive Map Integration</h4>
            <p className="text-sm text-gray-500 mb-6">
              Patients can view your exact location and get directions
            </p>
            <button className="bg-primary text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
              Configure Map Location
            </button>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="mt-8">
          <h4 className="text-lg font-jakarta font-semibold text-neutral-900 mb-4">Operating Hours</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(clinic.operatingHours).map(([day, hours]) => (
              <div key={day} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-inter font-medium text-gray-900 capitalize">{day}</span>
                  <span className={`text-sm font-inter ${hours.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                    {hours.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
                {hours.isOpen && (
                  <p className="text-sm text-gray-600 font-inter">
                    {hours.open} - {hours.close}
                  </p>
                )}
              </div>
            ))}
          </div>
          <button className="mt-4 text-primary hover:text-primary/80 font-inter font-medium">
            Edit Operating Hours
          </button>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-8">
      {/* Payment Methods */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-jakarta font-semibold text-neutral-900">Payment Methods</h3>
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
            Add Payment Method
          </button>
        </div>
        <div className="space-y-4">
          {paymentMethods.length === 0 ? (
            <div className="text-gray-500 font-inter">No payment methods found.</div>
          ) : (
            paymentMethods.map((method) => (
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
            ))
          )}
        </div>
      </div>

      {/* Invoices & Statements */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Invoices & Statements</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Invoice</th>
                <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Due Date</th>
                <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 ? (
                <tr><td colSpan={5} className="text-gray-500 font-inter py-4">No invoices found.</td></tr>
              ) : (
                invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-inter">#{invoice.id}</td>
                    <td className="py-3 px-4 font-inter">${invoice.amount}</td>
                    <td className="py-3 px-4 font-inter">{new Date(invoice.dueDate).toLocaleDateString()}</td>
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
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-primary hover:text-primary/80 font-inter text-sm">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-green-50 rounded-xl">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h4 className="font-jakarta font-semibold text-neutral-900 mb-2">System Health</h4>
          <p className="text-green-600 font-inter font-medium">{securityScans.length === 0 ? 'Unknown' : 'Good'}</p>
        </div>
        <div className="text-center p-6 bg-yellow-50 rounded-xl">
          <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
          <h4 className="font-jakarta font-semibold text-neutral-900 mb-2">Vulnerabilities</h4>
          <p className="text-yellow-600 font-inter font-medium">
            {securityScans.length === 0
              ? 'No recent scans'
              : `${securityScans[0].results.filter(r => r.severity === 'medium' || r.severity === 'high').length} Medium/High`}
          </p>
        </div>
        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h4 className="font-jakarta font-semibold text-neutral-900 mb-2">Compliance</h4>
          <p className="text-blue-600 font-inter font-medium">98% Score</p>
        </div>
      </div>

      {/* Vulnerability Scan Results */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-jakarta font-semibold text-neutral-900">Vulnerability Scan Status</h3>
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
            Run New Scan
          </button>
        </div>
        <div className="space-y-4">
          {securityScans.length === 0 ? (
            <div className="text-gray-500 font-inter">No scan results found.</div>
          ) : (
            securityScans[0].results.map((result, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-xs font-inter font-medium ${
                      result.severity === 'high' ? 'bg-red-100 text-red-800' :
                      result.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {result.severity.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600 font-inter">{result.category}</span>
                  </div>
                </div>
                <h5 className="font-inter font-medium text-neutral-900 mb-2">{result.description}</h5>
                <p className="text-sm text-gray-600 font-inter mb-2">{result.recommendation}</p>
                <div className="text-xs text-gray-500 font-inter">
                  Affected: {result.affectedSystems.join(', ')}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Audit Logs */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Audit Logs</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-inter font-medium text-gray-900">Security scan completed</h4>
              <p className="text-sm text-gray-600">System vulnerability assessment</p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-inter font-medium text-gray-900">User login</h4>
              <p className="text-sm text-gray-600">Administrator access from Chrome</p>
            </div>
            <span className="text-sm text-gray-500">4 hours ago</span>
          </div>
        </div>
      </div>

      {/* Compliance Reports */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Compliance Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            <FileText className="w-8 h-8 text-primary mb-4" />
            <h4 className="font-inter font-semibold text-gray-900 mb-2">HIPAA Compliance Report</h4>
            <p className="text-sm text-gray-600 mb-4">Latest compliance assessment</p>
            <button className="text-primary hover:text-primary/80 font-inter font-medium">
              Generate Report
            </button>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <Shield className="w-8 h-8 text-primary mb-4" />
            <h4 className="font-inter font-semibold text-gray-900 mb-2">Security Assessment</h4>
            <p className="text-sm text-gray-600 mb-4">Comprehensive security review</p>
            <button className="text-primary hover:text-primary/80 font-inter font-medium">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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

        {/* Loading/Error States */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-lg text-gray-500 font-inter">Loading...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-lg text-red-500 font-inter">{error}</span>
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-inter font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'services' && <div>Services & Staff content coming soon...</div>}
              {activeTab === 'subscription' && <div>Trial & Subscription content coming soon...</div>}
              {activeTab === 'billing' && renderBilling()}
              {activeTab === 'analytics' && <div>Analytics content coming soon...</div>}
              {activeTab === 'security' && renderSecurity()}
              {activeTab === 'account' && <div>Account & Security content coming soon...</div>}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default EnhancedClinicProfile;