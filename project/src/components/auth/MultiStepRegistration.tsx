import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, CheckCircle, X } from 'lucide-react';

interface RegistrationData {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  location: string;
  dateOfBirth: string;
  agreeToTerms: boolean;
  receiveNewsletter: boolean;
  receiveSMS: boolean;
  companyName: string;
  contactPerson: string;
  businessEmail: string;
  companyAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  drugCategories: string[];
  certifications: File[];
  website: string;
  linkedinUrl: string;
  clinicName: string;
  administratorName: string;
  clinicEmail: string;
  clinicAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  licenseNumber: string;
  licenseDocument: File | null;
  servicesOffered: string[];
  acceptedInsurance: string[];
  operatingHours: {
    [key: string]: { open: string; close: string; isOpen: boolean };
  };
}

interface MultiStepRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  'Account Info',
  'Personal Info',
  'Role Selection',
  'Confirmation',
];

const roles = [
  { label: 'Patient', value: 'patient' },
  { label: 'Clinic', value: 'clinic' },
  { label: 'Provider', value: 'provider' },
];

const MultiStepRegistration = ({ isOpen, onClose }: MultiStepRegistrationProps): JSX.Element | null => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    role: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<RegistrationData>({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    dateOfBirth: '',
    agreeToTerms: false,
    receiveNewsletter: false,
    receiveSMS: false,
    companyName: '',
    contactPerson: '',
    businessEmail: '',
    companyAddress: {
      street: '',
      city: '',
      postalCode: '',
      country: 'Algeria'
    },
    drugCategories: [],
    certifications: [],
    website: '',
    linkedinUrl: '',
    clinicName: '',
    administratorName: '',
    clinicEmail: '',
    clinicAddress: {
      street: '',
      city: '',
      postalCode: '',
      country: 'Algeria'
    },
    licenseNumber: '',
    licenseDocument: null,
    servicesOffered: [],
    acceptedInsurance: [],
    operatingHours: {
      monday: { open: '09:00', close: '17:00', isOpen: true },
      tuesday: { open: '09:00', close: '17:00', isOpen: true },
      wednesday: { open: '09:00', close: '17:00', isOpen: true },
      thursday: { open: '09:00', close: '17:00', isOpen: true },
      friday: { open: '09:00', close: '17:00', isOpen: true },
      saturday: { open: '09:00', close: '13:00', isOpen: true },
      sunday: { open: '09:00', close: '13:00', isOpen: false }
    }
  });

  useEffect(() => {
    if (formData.role) {
      localStorage.setItem('healthland_registration_data', JSON.stringify(formData));
    }
  }, [formData]);

  useEffect(() => {
    const savedData = localStorage.getItem('healthland_registration_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        if (parsedData.role) {
          setStep(getCurrentStepFromData(parsedData));
        }
      } catch (error) {
        console.error('Error loading saved registration data:', error);
      }
    }
  }, []);

  const getCurrentStepFromData = (data: RegistrationData) => {
    if (!data.role) return 1;
    return 1; // Simplified step determination
  };

  const handleNext = () => {
    if (validate()) setStep((s) => s + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleRoleSelect = (role: string) => {
    setForm({ ...form, role });
    setErrors({ ...errors, role: '' });
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const registrationData: Record<string, string> = {
        userId: (formData.email || formData.clinicEmail || formData.businessEmail || '').toLowerCase(),
        name: formData.clinicName || (formData.firstName + ' ' + formData.lastName) || formData.companyName || '',
        email: formData.role === 'supplier' ? formData.businessEmail : formData.role === 'clinic' ? formData.clinicEmail : formData.email,
        password: formData.password,
        role: formData.role
      };
      if (formData.role === 'clinic') {
        registrationData['subscriptionPlan'] = 'trial';
        registrationData['subscriptionDuration'] = '14';
      }
      const form = new FormData();
      Object.keys(registrationData).forEach(key => {
        form.append(key, registrationData[key]);
      });
      if (formData.role === 'clinic' && formData.licenseDocument) {
        form.append('certificate', formData.licenseDocument);
      }
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        body: form,
      });
      let responseData = {};
      const text = await response.text();
      try {
        responseData = text ? JSON.parse(text) : {};
      } catch {
        responseData = {};
      }
      if (!response.ok) {
        const errorMsg = (responseData && typeof responseData === 'object' && 'message' in responseData)
          ? (responseData as { message: string }).message
          : 'Registration failed';
        throw new Error(errorMsg);
      }
      localStorage.removeItem('healthland_registration_data');
      onClose();
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (step === 0) {
      if (!form.email) errs.email = 'Email is required';
      if (!form.password) errs.password = 'Password is required';
    }
    if (step === 1) {
      if (!form.name) errs.name = 'Name is required';
      if (!form.phone) errs.phone = 'Phone is required';
    }
    if (step === 2) {
      if (!form.role) errs.role = 'Please select a role';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const renderCurrentStep = () => {
    if (step === 0) {
      return (
        <motion.div
          key="account"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-primary flex items-center"><Mail className="w-5 h-5 mr-2" /> Account Info</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 font-inter ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="you@email.com"
            />
            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 font-inter ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="Create a password"
            />
            {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
          </div>
          <button
            onClick={handleNext}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200"
          >
            Next
          </button>
        </motion.div>
      );
    }

    if (step === 1) {
      return (
        <motion.div
          key="personal"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-primary flex items-center"><User className="w-5 h-5 mr-2" /> Personal Info</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 font-inter ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 font-inter ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
          </div>
          <button
            onClick={handleNext}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200"
          >
            Next
          </button>
        </motion.div>
      );
    }

    if (step === 2) {
      return (
        <motion.div
          key="role"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-primary flex items-center"><User className="w-5 h-5 mr-2" /> Role Selection</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={form.role}
              onChange={(e) => handleRoleSelect(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 font-inter ${errors.role ? 'border-red-400' : 'border-gray-300'}`}
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            {errors.role && <div className="text-red-500 text-xs mt-1">{errors.role}</div>}
          </div>
          <button
            onClick={handleNext}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200"
          >
            Next
          </button>
        </motion.div>
      );
    }

    if (step === 3) {
      return (
        <motion.div
          key="confirmation"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-primary flex items-center"><CheckCircle className="w-5 h-5 mr-2" /> Confirmation</h2>
          <p>Are you sure you want to submit this form?</p>
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200"
          >
            Submit
          </button>
        </motion.div>
      );
    }

    return null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-primary text-xl font-bold focus:outline-none"
          aria-label="Close registration modal"
        >
          <X className="w-6 h-6" />
        </button>
        {/* Progress Bar */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex-1 h-2 rounded-full ${i <= step ? 'bg-primary' : 'bg-gray-200'}`}></div>
              {i < steps.length - 1 && <div className="w-4 h-4 flex items-center justify-center"><span className="block w-2 h-2 rounded-full bg-primary/30"></span></div>}
            </React.Fragment>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {renderCurrentStep()}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MultiStepRegistration;