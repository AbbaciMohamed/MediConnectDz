import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, User, Mail, Lock, Phone, Eye, EyeOff, Check } from 'lucide-react';

interface SupplierContactProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;
  firstInputRef?: React.RefObject<HTMLInputElement>;
}

const SupplierContact: React.FC<SupplierContactProps> = ({ formData, setFormData, errors, firstInputRef }) => {
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
          Company & Contact Information
        </h3>
        <p className="text-gray-600 font-inter">
          Tell us about your company and primary contact person for supplier verification.
        </p>
      </div>

      <div>
        <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
          Company Name *
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={firstInputRef}
            type="text"
            required
            value={formData.companyName || ''}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
              errors.companyName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Pharmaceutical Company Ltd."
          />
        </div>
        {errors.companyName && <p className="text-red-600 text-sm mt-1">{errors.companyName}</p>}
      </div>

      <div>
        <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
          Primary Contact Person *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            required
            value={formData.contactPerson || ''}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
              errors.contactPerson ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="John Doe"
          />
        </div>
        {errors.contactPerson && <p className="text-red-600 text-sm mt-1">{errors.contactPerson}</p>}
      </div>

      <div>
        <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
          Business Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            required
            value={formData.businessEmail || ''}
            onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
              errors.businessEmail ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="contact@company.com"
          />
        </div>
        {errors.businessEmail && <p className="text-red-600 text-sm mt-1">{errors.businessEmail}</p>}
        <p className="text-xs text-gray-500 mt-1">
          This will be your login email and primary contact for tender notifications
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
          Used for urgent tender notifications and verification calls
        </p>
      </div>

      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <h4 className="font-inter font-semibold text-purple-900 mb-2">
          Supplier Verification Process
        </h4>
        <p className="text-purple-800 font-inter text-sm">
          After registration, our team will verify your company credentials and certifications. 
          This typically takes 1-2 business days and ensures trust in our marketplace.
        </p>
      </div>
    </motion.div>
  );
};

export default SupplierContact;