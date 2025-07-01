import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Shield, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  const { register, user } = useAuth();
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<RegistrationData>({
    role: null,
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    phone: '', location: '', dateOfBirth: '', agreeToTerms: false,
    receiveNewsletter: false, receiveSMS: false, companyName: '',
    contactPerson: '', businessEmail: '',
    companyAddress: { street: '', city: '', postalCode: '', country: 'Algeria' },
    drugCategories: [], certifications: [], website: '', linkedinUrl: '',
    clinicName: '', administratorName: '', clinicEmail: '',
    clinicAddress: { street: '', city: '', postalCode: '', country: 'Algeria' },
    licenseNumber: '', licenseDocument: null,
    servicesOffered: [], acceptedInsurance: [],
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

  // Save/load from localStorage as before
  useEffect(() => {
    if (formData.role) {
      localStorage.setItem('healthland_registration_data', JSON.stringify(formData));
    }
  }, [formData]);

  useEffect(() => {
    const saved = localStorage.getItem('healthland_registration_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        if (parsed.role) setCurrentStep(2);
      } catch {}
    }
  }, []);

  const getTotalSteps = () => {
    if (formData.role === 'patient') return 4;
    if (formData.role === 'supplier') return 5;
    if (formData.role === 'clinic') return 6;
    return 1;
  };

  const handleNext = () => {
    const total = getTotalSteps();
    if (currentStep < total) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const registrationData: any = {
        userId: (formData.email || formData.clinicEmail || formData.businessEmail || '').toLowerCase(),
        name: formData.clinicName || `${formData.firstName} ${formData.lastName}` || formData.companyName || '',
        email: formData.role === 'supplier' ? formData.businessEmail : formData.role === 'clinic' ? formData.clinicEmail : formData.email,
        password: formData.password,
        role: formData.role,
      };
      if (formData.role === 'clinic') {
        registrationData.subscriptionPlan = 'trial';
        registrationData.subscriptionDuration = '14';
      }
      const registeredUser = await register({ ...registrationData });
      localStorage.removeItem('healthland_registration_data');
      onClose();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentStep = () => {
    if (currentStep === 1) {
      return <RoleSelection selectedRole={formData.role} onRoleSelect={role => setFormData({ ...formData, role })} errors={{}} />;
    }
    if (formData.role === 'patient') {
      if (currentStep === 2) return <PatientBasicInfo formData={formData} setFormData={setFormData} errors={{}} firstInputRef={firstInputRef} />;
      if (currentStep === 3) return <PatientLocationPreferences formData={formData} setFormData={setFormData} errors={{}} firstInputRef={firstInputRef} />;
      if (currentStep === 4) return <PatientTermsVerification formData={formData} setFormData={setFormData} errors={{}} firstInputRef={firstInputRef} />;
    }
    if (formData.role === 'supplier') {
      if (currentStep === 2) return <SupplierContact formData={formData} setFormData={setFormData} errors={{}} firstInputRef={firstInputRef} />;
      if (currentStep === 3) return <SupplierAddress formData={formData} setFormData={setFormData} errors={{}} firstInputRef={firstInputRef} />;
      if (currentStep === 4) return <SupplierCertifications formData={formData} setFormData={setFormData} errors={{}} firstInputRef={firstInputRef} />;
      if (currentStep === 5) return <SupplierTerms formData={formData} setFormData={setFormData} errors={{}} firstInputRef={firstInputRef} />;
    }
    if (formData.role === 'clinic') {
      if (currentStep === 2) return <ClinicAdmin formData={formData} setFormData={setFormData} errors={{}} firstInputRef={firstInputRef} />;
      if (currentStep === 3) return <ClinicLicensing formData={formData} setFormData={setFormData} errors={{}} firstInputRef={firstInputRef} />;
      if (currentStep === 4) return <ClinicServices formData={formData} setFormData={setFormData} errors={{}} firstInputRef={firstInputRef} />;
      if (currentStep === 5) return <ClinicHours formData={formData} setFormData={setFormData} errors={{}} firstInputRef={firstInputRef} />;
      if (currentStep === 6) return <ClinicTerms formData={formData} setFormData={setFormData} errors={{}} firstInputRef={firstInputRef} />;
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-8 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Create Your Account</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Step {currentStep} of {getTotalSteps()}</span>
            <span>{Math.round((currentStep / getTotalSteps()) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2">
            <motion.div
              className="bg-white h-2 rounded-full"
              style={{ width: `${(currentStep / getTotalSteps()) * 100}%` }}
            />
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          {error && (
            <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-sm">
              {error}
            </div>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>

          {/* Special highlights for different roles */}
          {formData.role === 'clinic' && currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-200"
            >
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-lg font-bold text-green-800">14-Day Free Trial</h3>
              </div>
              <div className="text-green-700">
                <p className="mb-3"><strong>No credit card required!</strong> Get full access to all premium features:</p>
                <ul className="space-y-2">
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Security Medicine Suite</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Advanced Analytics Dashboard</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Premium Support & Training</li>
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
                <h3 className="text-lg font-bold text-purple-800">Supplier Verification Program</h3>
              </div>
              <div className="text-purple-700">
                <p className="mb-3">Join our trusted network of verified suppliers and gain access to:</p>
                <ul className="space-y-2">
                  <li className="flex items-center"><Check className="w-4 h-4 text-purple-600 mr-2" />Exclusive tender opportunities</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-purple-600 mr-2" />Direct communication with clinics</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-purple-600 mr-2" />Priority listing in marketplace</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>

        {/* FOOTER */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 sticky bottom-0 flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${
              currentStep === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          
          <div className="flex items-center space-x-2">
            {currentStep > 1 && (
              <span className="text-sm text-gray-500">
                Step {currentStep} of {getTotalSteps()}
              </span>
            )}
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="flex items-center bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  {currentStep === getTotalSteps() ? 'Complete Registration' : 'Next Step'}
                  {currentStep < getTotalSteps() && <ArrowRight className="w-5 h-5 ml-2" />}
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e0e7ef; border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default MultiStepRegistration;