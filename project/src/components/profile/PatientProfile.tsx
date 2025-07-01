import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Settings, 
  Bell, 
  Shield, 
  FileText, 
  Upload, 
  Download, 
  MessageCircle, 
  Clock, 
  Camera,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Link,
  HelpCircle,
  Star,
  Activity
} from 'lucide-react';
import { PatientProfile as PatientProfileType } from '../../types';

interface PatientProfileProps {
  patient: PatientProfileType & { email: string; id: string };
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(patient);
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'activity', label: 'Activity & History', icon: Activity },
    { id: 'documents', label: 'Documents & Support', icon: FileText }
  ];


  const [appointments, setAppointments] = useState<any[]>([]);
  const [pastVisits, setPastVisits] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch appointments (upcoming and past)
        const res = await fetch(`/api/appointments?patientId=${patient.id}`, { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch appointments');
        const data = await res.json();
        setAppointments(data.upcoming || []);
        setPastVisits(data.past || []);

        // Fetch documents
        const resDocs = await fetch(`/api/documents?patientId=${patient.id}`, { credentials: 'include' });
        if (resDocs.ok) {
          const docs = await resDocs.json();
          setDocuments(docs);
        }
      } catch (err: any) {
        setError(err.message || 'Error loading data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [patient.id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/profile/${editData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to update profile');
      // Optionally update local state with new data
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditData(patient);
    setIsEditing(false);
  };

  const renderPersonalDetails = () => (
    <div className="space-y-8">
      {/* Profile Photo Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Profile Photo</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white text-2xl font-jakarta font-bold">
              {patient.firstName?.[0]}{patient.lastName?.[0]}
            </div>
            <button className="absolute -bottom-2 -right-2 bg-white border-2 border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors">
              Upload Photo
            </button>
            <p className="text-sm text-gray-500 mt-2">JPG, PNG up to 5MB</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-jakarta font-semibold text-neutral-900">Personal Information</h3>
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
                <span className="font-inter text-gray-900">{patient.firstName || 'Not provided'}</span>
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
                <span className="font-inter text-gray-900">{patient.lastName || 'Not provided'}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Email Address</label>
            <div className="flex items-center space-x-3 py-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="font-inter text-gray-900">{patient.email}</span>
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
                <span className="font-inter text-gray-900">{patient.phone || 'Not provided'}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                value={editData.dateOfBirth ? editData.dateOfBirth.toISOString().split('T')[0] : ''}
                onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value ? new Date(e.target.value) : undefined })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
              />
            ) : (
              <div className="flex items-center space-x-3 py-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="font-inter text-gray-900">
                  {patient.dateOfBirth ? patient.dateOfBirth.toLocaleDateString() : 'Not provided'}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Emergency Contact</label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.emergencyContact || ''}
                onChange={(e) => setEditData({ ...editData, emergencyContact: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                placeholder="+213 555 987 654"
              />
            ) : (
              <div className="flex items-center space-x-3 py-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="font-inter text-gray-900">{patient.emergencyContact || 'Not provided'}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-8">
      {/* Communication Preferences */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Communication Preferences</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <h4 className="font-inter font-medium text-gray-900">Email Newsletters</h4>
                <p className="text-sm text-gray-600">Receive health tips and platform updates</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5 text-primary" />
              <div>
                <h4 className="font-inter font-medium text-gray-900">SMS Appointment Reminders</h4>
                <p className="text-sm text-gray-600">Get text reminders for upcoming appointments</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Linked Accounts */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Linked Accounts</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <div>
                <h4 className="font-inter font-medium text-gray-900">Google Account</h4>
                <p className="text-sm text-gray-600">Not connected</p>
              </div>
            </div>
            <button className="text-primary hover:text-primary/80 font-inter font-medium">
              Connect
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">f</span>
              </div>
              <div>
                <h4 className="font-inter font-medium text-gray-900">Facebook Account</h4>
                <p className="text-sm text-gray-600">Not connected</p>
              </div>
            </div>
            <button className="text-primary hover:text-primary/80 font-inter font-medium">
              Connect
            </button>
          </div>
        </div>
      </div>

      {/* Password & Security */}
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
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <button className="text-primary hover:text-primary/80 font-inter font-medium">
                Enable 2FA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-8">
      {loading ? (
        <div className="text-center py-12 text-gray-500 font-inter">Loading activity...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500 font-inter">{error}</div>
      ) : (
        <>
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Upcoming Appointments</h3>
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <div className="text-gray-500 font-inter text-center py-8">No upcoming appointments</div>
              ) : appointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-inter font-semibold text-gray-900">{appointment.type}</h4>
                      <p className="text-sm text-gray-600">{appointment.clinic}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-inter font-medium">
                      {appointment.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-inter text-gray-600">
                        {appointment.date ? new Date(appointment.date).toLocaleDateString() : '-'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-inter text-gray-600">{appointment.time || '-'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-inter text-gray-600">{appointment.doctor || '-'}</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="text-primary hover:text-primary/80 font-inter font-medium text-sm">
                      Reschedule
                    </button>
                    <button className="text-red-600 hover:text-red-700 font-inter font-medium text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Visits */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Past Visits</h3>
            <div className="space-y-4">
              {pastVisits.length === 0 ? (
                <div className="text-gray-500 font-inter text-center py-8">No past visits</div>
              ) : pastVisits.map((visit) => (
                <div key={visit.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-inter font-semibold text-gray-900">{visit.type}</h4>
                    <span className="text-sm text-gray-500">{visit.date ? new Date(visit.date).toLocaleDateString() : '-'}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-inter text-gray-600">{visit.clinic}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-inter text-gray-600">{visit.doctor}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-inter">{visit.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Transcripts */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Chat Transcripts</h3>
            <div className="text-center py-8">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="font-inter font-medium text-gray-600 mb-2">No chat history yet</h4>
              <p className="text-sm text-gray-500">Your conversations with healthcare providers will appear here</p>
            </div>
          </div>
        </>
      )}
    </div>
  );

  // Document upload handler
  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const formData = new FormData();
    for (const file of Array.from(e.target.files)) {
      formData.append('documents', file);
    }
    formData.append('patientId', patient.id);
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to upload document');
      // Refresh document list
      const docs = await res.json();
      setDocuments(docs);
      alert('Document(s) uploaded successfully!');
    } catch (err: any) {
      alert(err.message || 'Error uploading document');
    }
  };

  // Document download handler
  const handleDocumentDownload = async (docId: string) => {
    try {
      const res = await fetch(`/api/documents/${docId}/download`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to download document');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(err.message || 'Error downloading document');
    }
  };

  // Document delete handler
  const handleDocumentDelete = async (docId: string) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;
    try {
      const res = await fetch(`/api/documents/${docId}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Failed to delete document');
      setDocuments(docs => docs.filter(d => d.id !== docId));
      alert('Document deleted successfully!');
    } catch (err: any) {
      alert(err.message || 'Error deleting document');
    }
  };

  const renderDocuments = () => (
    <div className="space-y-8">
      {/* Downloadable Reports */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Medical Documents</h3>
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500 font-inter">Loading documents...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500 font-inter">{error}</div>
          ) : documents.length === 0 ? (
            <div className="text-center py-8 text-gray-500 font-inter">No documents found</div>
          ) : documents.map((doc: any) => (
            <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-inter font-medium text-gray-900">{doc.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{doc.type}</span>
                    <span>{doc.date ? new Date(doc.date).toLocaleDateString() : '-'}</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" onClick={() => handleDocumentDownload(doc.id)}>
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" onClick={() => handleDocumentDelete(doc.id)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Medical Documents */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Upload Medical Documents</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="font-inter font-semibold text-gray-700 mb-2">Upload Documents</h4>
          <p className="text-sm text-gray-600 mb-4">
            Upload allergies, prescriptions, or other medical documents
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            id="document-upload-input"
            onChange={handleDocumentUpload}
          />
          <label htmlFor="document-upload-input">
            <span className="bg-primary text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors cursor-pointer">
              Choose Files
            </span>
          </label>
          <p className="text-xs text-gray-500 mt-3">PDF, JPG, PNG up to 10MB</p>
        </div>
      </div>

      {/* Help & Feedback */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-jakarta font-semibold text-neutral-900 mb-6">Help & Support</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            <HelpCircle className="w-8 h-8 text-primary mb-4" />
            <h4 className="font-inter font-semibold text-gray-900 mb-2">Help Center</h4>
            <p className="text-sm text-gray-600 mb-4">Find answers to common questions</p>
            <button className="text-primary hover:text-primary/80 font-inter font-medium">
              Visit Help Center
            </button>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <MessageCircle className="w-8 h-8 text-primary mb-4" />
            <h4 className="font-inter font-semibold text-gray-900 mb-2">Contact Support</h4>
            <p className="text-sm text-gray-600 mb-4">Get help from our support team</p>
            <button className="text-primary hover:text-primary/80 font-inter font-medium">
              Contact Us
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
            My Profile
          </h1>
          <p className="text-gray-600 font-inter">
            Manage your personal information, preferences, and medical records.
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
              {activeTab === 'personal' && renderPersonalDetails()}
              {activeTab === 'preferences' && renderPreferences()}
              {activeTab === 'activity' && renderActivity()}
              {activeTab === 'documents' && renderDocuments()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;