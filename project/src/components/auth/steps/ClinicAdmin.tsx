import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, User, Mail, Lock, Phone, Eye, EyeOff, Check, Award } from 'lucide-react';

interface ClinicAdminProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;
}

const ClinicAdmin: React.FC<ClinicAdminProps> = ({ formData, setFormData, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial
    };
  };

  const passwordValidation = validatePassword(formData.password || '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-3">
          Clinic & Administrator Information
        </h3>
        <p className="text-gray-600 font-inter">
          Tell us about your clinic and the primary administrator who will manage the account.
        </p>
      </div>

      {/* Trial Highlight */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
        <div className="flex items-center mb-3">
          <Award className="w-6 h-6 text-green-600 mr-3" />
          <h4 className="text-lg font-jakarta font-bold text-green-800">
            14-Day Free Trial - No Credit Card Required!
          </h4>
        </div>
        <p className="text-green-700 font-inter text-sm">
          Get full access to all premium features including Security Medicine Suite, 
          Analytics Dashboard, and Premium Support during your trial period.
        </p>
      </div>

      <div>
        <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
          Clinic Name *
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            required
            value={formData.clinicName || ''}
            onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
              errors.clinicName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Medical Center Name"
          />
        </div>
        {errors.clinicName && <p className="text-red-600 text-sm mt-1">{errors.clinicName}</p>}
      </div>

      <div>
        <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
          Administrator Name *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            required
            value={formData.administratorName || ''}
            onChange={(e) => setFormData({ ...formData, administratorName: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
              errors.administratorName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Dr. John Doe"
          />
        </div>
        {errors.administratorName && <p className="text-red-600 text-sm mt-1">{errors.administratorName}</p>}
        <p className="text-xs text-gray-500 mt-1">
          The person responsible for managing this account and clinic operations
        </p>
      </div>

      <div>
        <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
          Official Clinic Email *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            required
            value={formData.clinicEmail || ''}
            onChange={(e) => setFormData({ ...formData, clinicEmail: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
              errors.clinicEmail ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="admin@clinic.com"
          />
        </div>
        {errors.clinicEmail && <p className="text-red-600 text-sm mt-1">{errors.clinicEmail}</p>}
        <p className="text-xs text-gray-500 mt-1">
          This will be your login email and primary contact for important notifications
        </p>
      </div>

      <div>
        <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
          Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password || ''}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
              errors.password ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        
        {formData.password && (
          <div className="mt-3 p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-2">Password requirements:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`flex items-center ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-400'}`}>
                <Check className="w-3 h-3 mr-1" />
                8+ characters
              </div>
              <div className={`flex items-center ${passwordValidation.hasUpper ? 'text-green-600' : 'text-gray-400'}`}>
                <Check className="w-3 h-3 mr-1" />
                Uppercase letter
              </div>
              <div className={`flex items-center ${passwordValidation.hasLower ? 'text-green-600' : 'text-gray-400'}`}>
                <Check className="w-3 h-3 mr-1" />
                Lowercase letter
              </div>
              <div className={`flex items-center ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-400'}`}>
                <Check className="w-3 h-3 mr-1" />
                Number
              </div>
              <div className={`flex items-center ${passwordValidation.hasSpecial ? 'text-green-600' : 'text-gray-400'}`}>
                <Check className="w-3 h-3 mr-1" />
                Special character
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="tel"
            required
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter"
            placeholder="+213 555 123 456"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Used for urgent notifications and verification calls
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-inter font-semibold text-blue-900 mb-2">
          Account Verification Process
        </h4>
        <p className="text-blue-800 font-inter text-sm">
          After registration, we'll verify your clinic credentials and medical licenses. 
          This ensures patient safety and maintains the quality of our healthcare network.
        </p>
      </div>
    </motion.div>
  );
};

export default ClinicAdmin;