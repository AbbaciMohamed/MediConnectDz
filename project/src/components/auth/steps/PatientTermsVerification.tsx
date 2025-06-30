import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Heart, Check } from 'lucide-react';

interface PatientTermsVerificationProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;
  firstInputRef?: React.RefObject<HTMLInputElement>;
}

const PatientTermsVerification: React.FC<PatientTermsVerificationProps> = ({ 
  formData, 
  setFormData, 
  errors, 
  firstInputRef 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-3">
          Terms & Verification
        </h3>
        <p className="text-gray-600 font-inter">
          Review and accept our terms to complete your registration and start your healthcare journey.
        </p>
      </div>

      {/* Terms Agreement */}
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <input
              ref={firstInputRef}
              type="checkbox"
              id="agreeToTerms"
              checked={formData.agreeToTerms || false}
              onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
              className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <div className="flex-1">
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700 font-inter cursor-pointer">
                I agree to the{' '}
                <button 
                  type="button"
                  className="text-primary hover:underline font-semibold"
                  onClick={() => window.open('#terms', '_blank')}
                >
                  Terms of Service
                </button>
                {' '}and{' '}
                <button 
                  type="button"
                  className="text-primary hover:underline font-semibold"
                  onClick={() => window.open('#privacy', '_blank')}
                >
                  Privacy Policy
                </button>
              </label>
              {errors.agreeToTerms && <p className="text-red-600 text-sm mt-1">{errors.agreeToTerms}</p>}
            </div>
          </div>
        </div>

        {/* Security & Privacy Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-jakarta font-semibold text-neutral-900 mb-2">
              HIPAA Compliant
            </h4>
            <p className="text-sm text-gray-600 font-inter">
              Your health data is protected with the highest security standards
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-jakarta font-semibold text-neutral-900 mb-2">
              Data Control
            </h4>
            <p className="text-sm text-gray-600 font-inter">
              You own your data and can export or delete it anytime
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-jakarta font-semibold text-neutral-900 mb-2">
              No Ads
            </h4>
            <p className="text-sm text-gray-600 font-inter">
              We never sell your data or show you targeted health ads
            </p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
          <h4 className="text-lg font-jakarta font-bold text-neutral-900 mb-3">
            Welcome to HealthLand! 🎉
          </h4>
          <p className="text-gray-700 font-inter mb-4">
            You're about to join thousands of patients who trust HealthLand for their healthcare needs. 
            Here's what happens next:
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-500 mr-3" />
              <span className="font-inter">Email verification sent to your inbox</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-500 mr-3" />
              <span className="font-inter">Complete your profile setup</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-500 mr-3" />
              <span className="font-inter">Start finding and booking appointments</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientTermsVerification;