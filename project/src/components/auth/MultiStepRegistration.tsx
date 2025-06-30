import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, User, Building, Package, Shield, Award, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import RoleSelection from './steps/RoleSelection';
import PatientBasicInfo from './steps/PatientBasicInfo';
import PatientLocationPreferences from './steps/PatientLocationPreferences';
import PatientTermsVerification from './steps/PatientTermsVerification';
import SupplierContact from './steps/SupplierContact';
import SupplierAddress from './steps/SupplierAddress';
import SupplierCertifications from './steps/SupplierCertifications';
import SupplierTerms from './steps/SupplierTerms';
import ClinicAdmin from './steps/ClinicAdmin';
import ClinicLicensing from './steps/ClinicLicensing';
import ClinicServices from './steps/ClinicServices';
import ClinicHours from './steps/ClinicHours';
import ClinicTerms from './steps/ClinicTerms';

interface RegistrationData {
  role: 'patient' | 'clinic' | 'supplier' | null;
  // Patient fields
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
  
  // Supplier fields
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
  
  // Clinic fields
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

const MultiStepRegistration: React.FC<MultiStepRegistrationProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register } = useAuth();

  const [formData, setFormData] = useState<RegistrationData>({
    role: null,
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

  const contentRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    if (formData.role) {
      localStorage.setItem('healthland_registration_data', JSON.stringify(formData));
    }
  }, [formData]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('healthland_registration_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        if (parsedData.role) {
          // Determine current step based on saved data
          setCurrentStep(getCurrentStepFromData(parsedData));
        }
      } catch (error) {
        console.error('Error loading saved registration data:', error);
      }
    }
  }, []);

  // Focus management: focus the first input of each step
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [currentStep]);

  const getCurrentStepFromData = (data: RegistrationData) => {
    if (!data.role) return 1;
    
    if (data.role === 'patient') {
      if (!data.email || !data.password) return 2;
      if (!data.location) return 3;
      return 4;
    } else if (data.role === 'supplier') {
      if (!data.companyName || !data.contactPerson) return 2;
      if (!data.companyAddress.street || data.drugCategories.length === 0) return 3;
      if (data.certifications.length === 0) return 4;
      return 5;
    } else if (data.role === 'clinic') {
      if (!data.clinicName || !data.administratorName) return 2;
      if (!data.clinicAddress.street || !data.licenseNumber) return 3;
      if (data.servicesOffered.length === 0) return 4;
      if (!data.operatingHours) return 5;
      return 6;
    }
    
    return 1;
  };

  const getTotalSteps = () => {
    if (!formData.role) return 1;
    if (formData.role === 'patient') return 4;
    if (formData.role === 'supplier') return 5;
    if (formData.role === 'clinic') return 6;
    return 1;
  };

  const getStepTitle = () => {
    if (currentStep === 1) return 'Choose Your Role';
    
    if (formData.role === 'patient') {
      switch (currentStep) {
        case 2: return 'Basic Information';
        case 3: return 'Location & Preferences';
        case 4: return 'Terms & Verification';
        default: return 'Registration';
      }
    } else if (formData.role === 'supplier') {
      switch (currentStep) {
        case 2: return 'Company & Contact';
        case 3: return 'Address & Categories';
        case 4: return 'Certifications';
        case 5: return 'Terms & Verification';
        default: return 'Registration';
      }
    } else if (formData.role === 'clinic') {
      switch (currentStep) {
        case 2: return 'Clinic & Administrator';
        case 3: return 'Location & Licensing';
        case 4: return 'Services & Insurance';
        case 5: return 'Operating Hours';
        case 6: return 'Trial Agreement';
        default: return 'Registration';
      }
    }
    
    return 'Registration';
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.role) {
        newErrors.role = 'Please select your role';
      }
    } else if (formData.role === 'patient') {
      if (currentStep === 2) {
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      } else if (currentStep === 3) {
        if (!formData.location) newErrors.location = 'Location is required';
      } else if (currentStep === 4) {
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
      }
    } else if (formData.role === 'supplier') {
      if (currentStep === 2) {
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
        if (!formData.businessEmail) newErrors.businessEmail = 'Business email is required';
        if (!formData.password) newErrors.password = 'Password is required';
      } else if (currentStep === 3) {
        if (!formData.companyAddress.street) newErrors.street = 'Street address is required';
        if (!formData.companyAddress.city) newErrors.city = 'City is required';
        if (formData.drugCategories.length === 0) newErrors.drugCategories = 'Select at least one category';
      } else if (currentStep === 5) {
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
      }
    } else if (formData.role === 'clinic') {
      if (currentStep === 2) {
        if (!formData.clinicName) newErrors.clinicName = 'Clinic name is required';
        if (!formData.administratorName) newErrors.administratorName = 'Administrator name is required';
        if (!formData.clinicEmail) newErrors.clinicEmail = 'Clinic email is required';
        if (!formData.password) newErrors.password = 'Password is required';
      } else if (currentStep === 3) {
        if (!formData.clinicAddress.street) newErrors.street = 'Street address is required';
        if (!formData.clinicAddress.city) newErrors.city = 'City is required';
        if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
      } else if (currentStep === 6) {
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the trial terms';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    const totalSteps = getTotalSteps();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({});
    try {
      // Prepare the registration data based on role
      const registrationData: any = {
        userId: (formData.email || formData.clinicEmail || formData.businessEmail || '').toLowerCase(),
        name: formData.clinicName || (formData.firstName + ' ' + formData.lastName) || formData.companyName || '',
        email: formData.role === 'supplier' ? formData.businessEmail : formData.role === 'clinic' ? formData.clinicEmail : formData.email,
        password: formData.password,
        role: formData.role
      };
      if (formData.role === 'clinic') {
        registrationData.subscriptionPlan = 'trial';
        registrationData.subscriptionDuration = '14';
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
      } catch (e) {
        responseData = {};
      }
      if (!response.ok) {
        const errorMsg = (responseData && typeof responseData === 'object' && 'message' in responseData)
          ? (responseData as any).message
          : 'Registration failed';
        throw new Error(errorMsg);
      }
      localStorage.removeItem('healthland_registration_data');
      onClose();
      console.log('Registration successful!');
    } catch (error: any) {
      console.error('Registration error:', error);
      setErrors({
        general: error.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentStep = (firstInputRef: React.RefObject<HTMLInputElement>) => {
    if (currentStep === 1) {
      return (
        <RoleSelection
          selectedRole={formData.role}
          onRoleSelect={(role) => setFormData({ ...formData, role })}
          errors={errors}
        />
      );
    }

    if (formData.role === 'patient') {
      switch (currentStep) {
        case 2:
          return (
            <PatientBasicInfo
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              firstInputRef={firstInputRef}
            />
          );
        case 3:
          return (
            <PatientLocationPreferences
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              firstInputRef={firstInputRef}
            />
          );
        case 4:
          return (
            <PatientTermsVerification
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              firstInputRef={firstInputRef}
            />
          );
      }
    } else if (formData.role === 'supplier') {
      switch (currentStep) {
        case 2:
          return (
            <SupplierContact
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              firstInputRef={firstInputRef}
            />
          );
        case 3:
          return (
            <SupplierAddress
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              firstInputRef={firstInputRef}
            />
          );
        case 4:
          return (
            <SupplierCertifications
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              firstInputRef={firstInputRef}
            />
          );
        case 5:
          return (
            <SupplierTerms
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              firstInputRef={firstInputRef}
            />
          );
      }
    } else if (formData.role === 'clinic') {
      switch (currentStep) {
        case 2:
          return (
            <ClinicAdmin
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              firstInputRef={firstInputRef}
            />
          );
        case 3:
          return (
            <ClinicLicensing
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              firstInputRef={firstInputRef}
            />
          );
        case 4:
          return (
            <ClinicServices
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              firstInputRef={firstInputRef}
            />
          );
        case 5:
          return (
            <ClinicHours
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              firstInputRef={firstInputRef}
            />
          );
        case 6:
          return (
            <ClinicTerms
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              firstInputRef={firstInputRef}
            />
          );
      }
    }

    return null;
  };

  const getCompletedSteps = () => {
    const completed = [];
    for (let i = 1; i < currentStep; i++) {
      completed.push(i);
    }
    return completed;
  };

  const isLastStep = () => {
    return currentStep === getTotalSteps();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-modal-title"
      >
        {/* Sticky Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-8 sticky top-0 z-10" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 id="registration-modal-title" className="text-3xl font-jakarta font-bold">
                Create Your Account
              </h2>
              <p className="text-primary-100 font-inter mt-2">
                {getStepTitle()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close registration modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm font-inter">
              <span>Step {currentStep} of {getTotalSteps()}</span>
              <span>{Math.round((currentStep / getTotalSteps()) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / getTotalSteps()) * 100}%` }}
              />
            </div>
            
            {/* Step indicators */}
            <div className="flex justify-between mt-4">
              {Array.from({ length: getTotalSteps() }, (_, i) => i + 1).map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all duration-300 ${
                    getCompletedSteps().includes(step)
                      ? 'bg-white text-primary'
                      : step === currentStep
                      ? 'bg-white text-primary'
                      : 'bg-white/20 text-white/60'
                  }`}
                >
                  {getCompletedSteps().includes(step) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content Area with styled scrollbar */}
        <div
          ref={contentRef}
          className="flex-1 p-8 overflow-y-auto custom-scrollbar"
          style={{ maxHeight: 'calc(90vh - 200px)' }}
          tabIndex={0}
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderCurrentStep(firstInputRef)}
            </motion.div>
          </AnimatePresence>

          {/* Special highlights */}
          {formData.role === 'clinic' && currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-200"
            >
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-lg font-jakarta font-bold text-green-800">
                  14-Day Free Trial
                </h3>
              </div>
              <div className="text-green-700 font-inter">
                <p className="mb-3">
                  <strong>No credit card required!</strong> Get full access to all premium features:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-600 mr-2" />
                    Security Medicine Suite
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-600 mr-2" />
                    Advanced Analytics Dashboard
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-600 mr-2" />
                    Premium Support & Training
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {formData.role === 'supplier' && currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-purple-50 rounded-2xl border border-purple-200"
            >
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-lg font-jakarta font-bold text-purple-800">
                  Supplier Verification Program
                </h3>
              </div>
              <div className="text-purple-700 font-inter">
                <p className="mb-3">
                  Join our trusted network of verified suppliers and gain access to:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-2" />
                    Exclusive tender opportunities
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-2" />
                    Direct communication with clinics
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-2" />
                    Priority listing in marketplace
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sticky Footer */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 sticky bottom-0 z-10" style={{ boxShadow: '0 -2px 8px rgba(0,0,0,0.03)' }}>
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-inter font-semibold transition-all duration-200 ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-3 focus:ring-gray-300/30'
              }`}
              aria-label="Go to previous step"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-xl font-inter font-semibold hover:bg-primary/90 transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={isLastStep() ? 'Create Account' : 'Go to next step'}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isLastStep() ? 'Create Account' : 'Next'}</span>
                  {!isLastStep() && <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>
          </div>

          {errors.general && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-inter text-sm">{errors.general}</p>
            </div>
          )}
        </div>
      </motion.div>
      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e0e7ef;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default MultiStepRegistration;