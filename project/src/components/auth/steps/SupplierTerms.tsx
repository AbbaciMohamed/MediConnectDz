import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Award, Check, Star, TrendingUp } from 'lucide-react';

interface SupplierTermsProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;
}

const SupplierTerms: React.FC<SupplierTermsProps> = ({ formData, setFormData, errors }) => {
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
          Review and accept our supplier terms to complete your registration and join our verified network.
        </p>
      </div>

      {/* Terms Agreement */}
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <input
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
                  onClick={() => window.open('#supplier-terms', '_blank')}
                >
                  Supplier Terms & Conditions
                </button>
                ,{' '}
                <button 
                  type="button"
                  className="text-primary hover:underline font-semibold"
                  onClick={() => window.open('#data-use-policy', '_blank')}
                >
                  Data-Use Policy
                </button>
                , and{' '}
                <button 
                  type="button"
                  className="text-primary hover:underline font-semibold"
                  onClick={() => window.open('#marketplace-guidelines', '_blank')}
                >
                  Marketplace Guidelines
                </button>
              </label>
              {errors.agreeToTerms && <p className="text-red-600 text-sm mt-1">{errors.agreeToTerms}</p>}
            </div>
          </div>
        </div>

        {/* Supplier Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <Award className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-jakarta font-semibold text-neutral-900 mb-2">
              Verified Badge
            </h4>
            <p className="text-sm text-gray-600 font-inter">
              Get a verified supplier badge that builds trust with healthcare providers
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-jakarta font-semibold text-neutral-900 mb-2">
              Priority Listing
            </h4>
            <p className="text-sm text-gray-600 font-inter">
              Verified suppliers appear first in search results and tender matches
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-jakarta font-semibold text-neutral-900 mb-2">
              Secure Platform
            </h4>
            <p className="text-sm text-gray-600 font-inter">
              All transactions and communications are encrypted and secure
            </p>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gradient-to-r from-purple/10 to-primary/10 rounded-2xl p-6 border border-purple/20">
          <h4 className="text-lg font-jakarta font-bold text-neutral-900 mb-3 flex items-center">
            <Star className="w-5 h-5 text-primary mr-2" />
            Welcome to the HealthLand Supplier Network! 🎉
          </h4>
          <p className="text-gray-700 font-inter mb-4">
            You're about to join 300+ verified suppliers who trust HealthLand for their business growth. 
            Here's what happens next:
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-500 mr-3" />
              <span className="font-inter">Email verification sent to your business email</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-500 mr-3" />
              <span className="font-inter">Document verification process begins (1-2 days)</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-500 mr-3" />
              <span className="font-inter">Access to exclusive tenders and direct clinic communication</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-500 mr-3" />
              <span className="font-inter">Marketplace listing with verified badge</span>
            </div>
          </div>
        </div>

        {/* Key Terms Summary */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h4 className="font-jakarta font-semibold text-neutral-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 text-primary mr-2" />
            Key Terms Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 font-inter">
            <div>
              <strong>Commission:</strong> 2.5% on successful tender awards
            </div>
            <div>
              <strong>Payment Terms:</strong> Net 30 days from delivery
            </div>
            <div>
              <strong>Quality Standards:</strong> All products must meet regulatory requirements
            </div>
            <div>
              <strong>Support:</strong> Dedicated account manager for verified suppliers
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SupplierTerms;