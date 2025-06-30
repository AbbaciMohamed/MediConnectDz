import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, TrendingUp, Check, Star, Clock, Users } from 'lucide-react';

interface ClinicTermsProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;
}

const ClinicTerms: React.FC<ClinicTermsProps> = ({ formData, setFormData, errors }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-3">
          Trial Agreement & Launch
        </h3>
        <p className="text-gray-600 font-inter">
          Review your trial benefits and complete your clinic registration to start serving patients.
        </p>
      </div>

      {/* 14-Day Trial Highlight */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 border-2 border-green-200">
        <div className="text-center">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-inter font-bold mb-4">
            <Award className="w-4 h-4 mr-2" />
            14-Day Free Trial - No Credit Card Required!
          </div>
          <h4 className="text-2xl font-jakarta font-bold text-green-800 mb-4">
            Full Access to Premium Features
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h5 className="font-jakarta font-semibold text-green-800 mb-2">Security Medicine Suite</h5>
              <p className="text-green-700 font-inter text-sm">Advanced security scanning and compliance monitoring</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h5 className="font-jakarta font-semibold text-green-800 mb-2">Analytics Dashboard</h5>
              <p className="text-green-700 font-inter text-sm">Detailed insights and performance metrics</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h5 className="font-jakarta font-semibold text-green-800 mb-2">Premium Support</h5>
              <p className="text-green-700 font-inter text-sm">Priority support and onboarding assistance</p>
            </div>
          </div>
          <div className="bg-white/50 rounded-2xl p-4">
            <p className="text-green-800 font-inter text-sm">
              <strong>Trial includes:</strong> Unlimited patient bookings, full platform access, 
              security features, analytics, and dedicated support. No hidden fees or commitments.
            </p>
          </div>
        </div>
      </div>

      {/* Terms Agreement */}
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
                onClick={() => window.open('#trial-terms', '_blank')}
              >
                14-Day Trial Terms
              </button>
              ,{' '}
              <button 
                type="button"
                className="text-primary hover:underline font-semibold"
                onClick={() => window.open('#subscription-agreement', '_blank')}
              >
                Subscription Agreement
              </button>
              , and{' '}
              <button 
                type="button"
                className="text-primary hover:underline font-semibold"
                onClick={() => window.open('#clinic-guidelines', '_blank')}
              >
                Healthcare Provider Guidelines
              </button>
            </label>
            {errors.agreeToTerms && <p className="text-red-600 text-sm mt-1">{errors.agreeToTerms}</p>}
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
        <h4 className="text-lg font-jakarta font-bold text-neutral-900 mb-3 flex items-center">
          <Star className="w-5 h-5 text-primary mr-2" />
          Welcome to HealthLand! 🎉
        </h4>
        <p className="text-gray-700 font-inter mb-4">
          You're about to join 500+ healthcare providers who trust HealthLand for their practice management. 
          Here's what happens next:
        </p>
        <div className="space-y-3">
          <div className="flex items-start text-sm text-gray-700">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
            <div>
              <span className="font-inter font-semibold">Email verification</span>
              <p className="text-gray-600 text-xs">Verify your clinic email to activate your account</p>
            </div>
          </div>
          <div className="flex items-start text-sm text-gray-700">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
            <div>
              <span className="font-inter font-semibold">License verification (1-2 days)</span>
              <p className="text-gray-600 text-xs">Our team will verify your medical license and credentials</p>
            </div>
          </div>
          <div className="flex items-start text-sm text-gray-700">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
            <div>
              <span className="font-inter font-semibold">Onboarding wizard</span>
              <p className="text-gray-600 text-xs">Complete your profile setup and platform training</p>
            </div>
          </div>
          <div className="flex items-start text-sm text-gray-700">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</div>
            <div>
              <span className="font-inter font-semibold">Start accepting patients</span>
              <p className="text-gray-600 text-xs">Your clinic goes live and patients can book appointments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Plans Preview */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h4 className="font-jakarta font-semibold text-neutral-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 text-primary mr-2" />
          After Your Trial
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-jakarta font-semibold text-neutral-900 mb-2">Basic Plan</h5>
            <p className="text-2xl font-jakarta font-bold text-neutral-900 mb-2">$99<span className="text-sm text-gray-600">/mo</span></p>
            <ul className="space-y-1 text-gray-600 font-inter">
              <li>• Patient management</li>
              <li>• Basic booking system</li>
              <li>• Email support</li>
            </ul>
          </div>
          <div className="border-2 border-primary rounded-lg p-4 relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
              RECOMMENDED
            </div>
            <h5 className="font-jakarta font-semibold text-neutral-900 mb-2">Pro Plan</h5>
            <p className="text-2xl font-jakarta font-bold text-neutral-900 mb-2">$199<span className="text-sm text-gray-600">/mo</span></p>
            <ul className="space-y-1 text-gray-600 font-inter">
              <li>• Everything in Basic</li>
              <li>• Security Medicine Suite</li>
              <li>• Advanced analytics</li>
              <li>• Priority support</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-jakarta font-semibold text-neutral-900 mb-2">Enterprise</h5>
            <p className="text-2xl font-jakarta font-bold text-neutral-900 mb-2">$399<span className="text-sm text-gray-600">/mo</span></p>
            <ul className="space-y-1 text-gray-600 font-inter">
              <li>• Everything in Pro</li>
              <li>• White-label options</li>
              <li>• API access</li>
              <li>• Dedicated support</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-gray-500 font-inter mt-4 text-center">
          You can change or cancel your subscription anytime. No long-term commitments.
        </p>
      </div>
    </motion.div>
  );
};

export default ClinicTerms;