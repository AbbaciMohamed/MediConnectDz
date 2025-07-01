import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Award, 
  FileText, 
  Upload, 
  Download, 
  Calendar, 
  Settings, 
  Shield, 
  DollarSign, 
  Clock, 
  Camera,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Building,
  Stethoscope,
  CheckCircle,
  Star,
  Activity,
  Key,
  MapPin
} from 'lucide-react';
import { DoctorProfile as DoctorProfileType } from '../../types';

interface DoctorProfileProps {
  doctor: DoctorProfileType & { email: string; id: string };
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctor }) => {
  const [activeTab, setActiveTab] = useState('professional');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(doctor);
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'professional', label: 'Professional Information', icon: User },
    { id: 'credentials', label: 'Credentials & Licensing', icon: Award },
    { id: 'services', label: 'Service Listings', icon: Stethoscope },
    { id: 'activity', label: 'Activity & Earnings', icon: Activity },
    { id: 'security', label: 'Security & Access', icon: Shield }
  ];


  const [appointments, setAppointments] = useState<any[]>([]);
  const [pastConsultations, setPastConsultations] = useState<any[]>([]);
  const [earnings, setEarnings] = useState({ thisMonth: 0, lastMonth: 0, totalEarnings: 0, pendingPayouts: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch appointments (upcoming and past)
        const res = await fetch(`/api/appointments?doctorId=${doctor.id}`, { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch appointments');
        const data = await res.json();
        setAppointments(data.upcoming || []);
        setPastConsultations(data.past || []);

        // Fetch earnings (if available)
        const resEarnings = await fetch(`/api/analytics/earnings?doctorId=${doctor.id}`, { credentials: 'include' });
        if (resEarnings.ok) {
          const earn = await resEarnings.json();
          setEarnings(earn);
        }
      } catch (err: any) {
        setError(err.message || 'Error loading data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [doctor.id]);

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
    } catch (error) {
      alert('Error updating profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditData(doctor);
    setIsEditing(false);
  };

  const renderProfessionalInfo = () => (
    <div className="space-y-8">
      {/* Profile Photo Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Profile Photo</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white text-2xl font-jakarta font-bold">
              Dr. {doctor.firstName?.[0]}{doctor.lastName?.[0]}
            </div>
            <button className="absolute -bottom-2 -right-2 bg-white border-2 border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
              Upload Photo
            </button>
            <p className="text-sm text-gray-500 mt-2">Professional headshot recommended</p>
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-jakarta font-semibold text-neutral-900">Professional Information</h3>
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
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">First Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.firstName || ''}
                onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
              />
            ) : (
              <div className="flex items-center space-x-3 py-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="font-inter text-gray-900">{doctor.firstName}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.lastName || ''}
                onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
              />
            ) : (
              <div className="flex items-center space-x-3 py-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="font-inter text-gray-900">{doctor.lastName}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Title</label>
            {isEditing ? (
              <select
                value={editData.title || ''}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
              >
                <option value="">Select title</option>
                <option value="MD">MD</option>
                <option value="DO">DO</option>
                <option value="PhD">PhD</option>
                <option value="DDS">DDS</option>
                <option value="PharmD">PharmD</option>
              </select>
            ) : (
              <div className="flex items-center space-x-3 py-3">
                <Award className="w-5 h-5 text-gray-400" />
                <span className="font-inter text-gray-900">{doctor.title}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Email Address</label>
            <div className="flex items-center space-x-3 py-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="font-inter text-gray-900">{doctor.email}</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Read-only</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.phone || ''}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                placeholder="+213 555 123 456"
              />
            ) : (
              <div className="flex items-center space-x-3 py-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="font-inter text-gray-900">{doctor.phone}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Verification Status</label>
            <div className="flex items-center space-x-3 py-3">
              {doctor.isVerified ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-inter text-green-600 font-medium">Verified Doctor</span>
                </>
              ) : (
                <>
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <span className="font-inter text-yellow-600 font-medium">Pending Verification</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="mt-8">
          <h4 className="text-lg font-jakarta font-semibold text-neutral-900 mb-4">Medical Specialties</h4>
          <div className="flex flex-wrap gap-2">
            {doctor.specialty.map((spec, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-inter font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Clinic Affiliations */}
        <div className="mt-8">
          <h4 className="text-lg font-jakarta font-semibold text-neutral-900 mb-4">Clinic Affiliations</h4>
          <div className="space-y-3">
            {doctor.clinicAffiliations.map((clinic, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Building className="w-5 h-5 text-gray-400" />
                <span className="font-inter text-gray-900">{clinic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCredentials = () => (
    <div className="space-y-8">
      {/* Medical License */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Medical License</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">License Number</label>
            <div className="flex items-center space-x-3 py-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="font-inter text-gray-900">{doctor.licenseNumber}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">License Document</label>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
                <Eye className="w-4 h-4" />
                <span className="font-inter font-medium">View Document</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Download className="w-4 h-4" />
                <span className="font-inter font-medium">Download</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-primary transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h4 className="font-inter font-semibold text-gray-700 mb-2">Update License Document</h4>
            <p className="text-sm text-gray-600 mb-4">Upload a new version of your medical license</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
              Choose File
            </button>
          </div>
        </div>
      </div>

      {/* Board Certifications */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Board Certifications</h3>
        <div className="space-y-4">
          {doctor.boardCertifications.map((cert, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-inter font-medium text-gray-900">{cert}</h4>
                  <p className="text-sm text-gray-500">Board Certified</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-primary transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h4 className="font-inter font-semibold text-gray-700 mb-2">Add New Certification</h4>
            <p className="text-sm text-gray-600 mb-4">Upload additional board certifications</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
              Choose Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-8">
      {/* Services Offered */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Services Offered</h3>
        <div className="space-y-4">
          {doctor.servicesOffered.map((service) => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-inter font-semibold text-gray-900">{service.name}</h4>
                <div className="flex items-center space-x-4">
                  {service.price && (
                    <span className="text-lg font-jakarta font-bold text-primary">
                      {service.price.toLocaleString()} DZD
                    </span>
                  )}
                  <button className="text-primary hover:text-primary/80 font-inter font-medium text-sm">
                    Edit
                  </button>
                </div>
              </div>
              <p className="text-gray-600 font-inter mb-4">{service.description}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Stethoscope className="w-4 h-4" />
                  <span>{service.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 bg-primary text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
          Add New Service
        </button>
      </div>

      {/* Availability Calendar */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Availability Calendar</h3>
        <div className="text-center py-8">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h4 className="font-inter font-medium text-gray-600 mb-2">Calendar Integration Coming Soon</h4>
          <p className="text-sm text-gray-500 mb-6">
            Set your available time slots for patient bookings
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
            Configure Availability
          </button>
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-8">
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-500" />
            <span className="text-green-600 text-sm font-inter font-medium">+15%</span>
          </div>
          <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">
            {earnings.thisMonth.toLocaleString()} DZD
          </h3>
          <p className="text-gray-600 font-inter">This Month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-blue-500" />
            <span className="text-blue-600 text-sm font-inter font-medium">Last Month</span>
          </div>
          <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">
            {earnings.lastMonth.toLocaleString()} DZD
          </h3>
          <p className="text-gray-600 font-inter">Previous Period</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Star className="w-8 h-8 text-primary" />
            <span className="text-primary text-sm font-inter font-medium">Total</span>
          </div>
          <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">
            {earnings.totalEarnings.toLocaleString()} DZD
          </h3>
          <p className="text-gray-600 font-inter">All Time</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-yellow-500" />
            <span className="text-yellow-600 text-sm font-inter font-medium">Pending</span>
          </div>
          <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-1">
            {earnings.pendingPayouts.toLocaleString()} DZD
          </h3>
          <p className="text-gray-600 font-inter">Pending Payout</p>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Upcoming Appointments</h3>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-inter font-semibold text-gray-900">{appointment.type}</h4>
                  <p className="text-sm text-gray-600">Patient: {appointment.patient}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-jakarta font-bold text-primary">
                    {appointment.fee.toLocaleString()} DZD
                  </span>
                  <p className="text-sm text-gray-500">Fee</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-inter text-gray-600">
                    {appointment.date.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-inter text-gray-600">{appointment.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-inter text-gray-600">{appointment.clinic}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Consultations */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Past Consultations</h3>
        <div className="space-y-4">
          {pastConsultations.map((consultation) => (
            <div key={consultation.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-inter font-semibold text-gray-900">{consultation.type}</h4>
                <div className="text-right">
                  <span className="text-lg font-jakarta font-bold text-green-600">
                    {consultation.fee.toLocaleString()} DZD
                  </span>
                  <p className="text-sm text-gray-500">Earned</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-inter font-medium">{consultation.patient}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-inter font-medium">{consultation.date.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Clinic</p>
                  <p className="font-inter font-medium">{consultation.clinic}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 font-inter">{consultation.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Payout History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Period</th>
                <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Earnings</th>
                <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Payout</th>
                <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-inter font-semibold text-gray-900">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-inter">December 2024</td>
                <td className="py-3 px-4 font-inter">125,000 DZD</td>
                <td className="py-3 px-4 font-inter">118,750 DZD</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-inter">Paid</span>
                </td>
                <td className="py-3 px-4 font-inter">Jan 5, 2025</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-inter">November 2024</td>
                <td className="py-3 px-4 font-inter">98,500 DZD</td>
                <td className="py-3 px-4 font-inter">93,575 DZD</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-inter">Paid</span>
                </td>
                <td className="py-3 px-4 font-inter">Dec 5, 2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8">
      {/* Password & 2FA */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Password & Security</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter pr-12"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button className="bg-primary text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
            Change Password
          </button>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-inter font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Secure your account with 2FA</p>
              </div>
              <button className="text-primary hover:text-primary/80 font-inter font-medium">
                Enable 2FA
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* API Keys (if applicable) */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">API Access</h3>
        <div className="text-center py-8">
          <Key className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h4 className="font-inter font-medium text-gray-600 mb-2">API Integration Available</h4>
          <p className="text-sm text-gray-500 mb-6">
            Connect your practice management software with HealthLand
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
            Request API Access
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Active Sessions</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-inter font-medium text-gray-900">Current Session</h4>
              <p className="text-sm text-gray-600">Chrome on Windows • Algiers, Algeria</p>
              <p className="text-xs text-gray-500">Last active: Now</p>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-inter">Active</span>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-inter font-medium text-gray-900">Mobile Session</h4>
              <p className="text-sm text-gray-600">Safari on iPhone • Oran, Algeria</p>
              <p className="text-xs text-gray-500">Last active: 2 hours ago</p>
            </div>
            <button className="text-red-600 hover:text-red-700 font-inter text-sm">Logout</button>
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
            Dr. {doctor.firstName} {doctor.lastName}, {doctor.title}
          </h1>
          <p className="text-gray-600 font-inter">
            Manage your professional profile, appointments, and earnings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-inter font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'professional' && renderProfessionalInfo()}
              {activeTab === 'credentials' && renderCredentials()}
              {activeTab === 'services' && renderServices()}
              {activeTab === 'activity' && renderActivity()}
              {activeTab === 'security' && renderSecurity()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;