import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Eye, EyeOff, Check } from 'lucide-react';

interface PatientBasicInfoProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;
  firstInputRef?: React.RefObject<HTMLInputElement>;
}

const PatientBasicInfo: React.FC<PatientBasicInfoProps> = ({ formData, setFormData, errors, firstInputRef }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          Basic Information
        </h3>
        <p className="text-gray-600 font-inter">
          Let's start with your basic details to create your patient account.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={firstInputRef}
              type="text"
              required
              value={formData.firstName || ''}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
                errors.firstName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="John"
            />
          </div>
          {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              required
              value={formData.lastName || ''}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
                errors.lastName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Doe"
            />
          </div>
          {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            required
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="your@email.com"
          />
        </div>
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
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
          Confirm Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            required
            value={formData.confirmPassword || ''}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
              errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>

      <div>
        <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
          Phone Number (Optional)
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter"
            placeholder="+213 555 123 456"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Used for appointment reminders and emergency contact</p>
      </div>
    </motion.div>
  );
};

export default PatientBasicInfo;