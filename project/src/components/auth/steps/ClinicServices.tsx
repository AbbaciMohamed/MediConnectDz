import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Shield, Check } from 'lucide-react';

interface ClinicServicesProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;
}

const ClinicServices: React.FC<ClinicServicesProps> = ({ formData, setFormData, errors }) => {
  const medicalServices = [
    'General Medicine', 'Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics',
    'Neurology', 'Psychiatry', 'Emergency Care', 'Laboratory Services', 'Radiology',
    'Surgery', 'Dental Care', 'Eye Care', 'Physical Therapy', 'Gynecology',
    'Urology', 'ENT (Ear, Nose, Throat)', 'Oncology', 'Endocrinology', 'Rheumatology',
    'Pulmonology', 'Gastroenterology', 'Nephrology', 'Anesthesiology', 'Pathology',
    'Rehabilitation', 'Nutrition Counseling', 'Mental Health', 'Preventive Care', 'Other'
  ];

  const insuranceProviders = [
    'CNAS (Caisse Nationale des Assurances Sociales)',
    'CASNOS (Caisse d\'Assurance Sociale des Non-Salariés)',
    'CNR (Caisse Nationale de Retraite)',
    'Private Insurance Companies',
    'International Insurance',
    'Self-Pay / Cash',
    'Corporate Health Plans',
    'Government Employee Insurance',
    'Military Health Insurance',
    'Student Health Insurance'
  ];

  const toggleService = (service: string) => {
    const currentServices = formData.servicesOffered || [];
    const newServices = currentServices.includes(service)
      ? currentServices.filter((s: string) => s !== service)
      : [...currentServices, service];
    
    setFormData({ ...formData, servicesOffered: newServices });
  };

  const toggleInsurance = (insurance: string) => {
    const currentInsurance = formData.acceptedInsurance || [];
    const newInsurance = currentInsurance.includes(insurance)
      ? currentInsurance.filter((i: string) => i !== insurance)
      : [...currentInsurance, insurance];
    
    setFormData({ ...formData, acceptedInsurance: newInsurance });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-3">
          Services & Insurance
        </h3>
        <p className="text-gray-600 font-inter">
          Select the medical services you offer and insurance providers you accept.
        </p>
      </div>

      {/* Services Offered */}
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-jakarta font-semibold text-neutral-900 mb-2 flex items-center">
            <Stethoscope className="w-5 h-5 mr-2 text-primary" />
            Services Offered
          </h4>
          <p className="text-gray-600 font-inter text-sm mb-4">
            Select all medical services and specialties available at your clinic. This helps patients find you for their specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
          {medicalServices.map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => toggleService(service)}
              className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                (formData.servicesOffered || []).includes(service)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-inter font-medium">{service}</span>
                {(formData.servicesOffered || []).includes(service) && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
        
        <div className="text-sm text-gray-600 font-inter">
          Selected: {(formData.servicesOffered || []).length} services
        </div>
      </div>

      {/* Accepted Insurance */}
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-jakarta font-semibold text-neutral-900 mb-2 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary" />
            Accepted Insurance Providers
          </h4>
          <p className="text-gray-600 font-inter text-sm mb-4">
            Select all insurance providers and payment methods you accept. This helps patients understand their coverage options.
          </p>
        </div>
        
        <div className="space-y-3">
          {insuranceProviders.map((insurance) => (
            <button
              key={insurance}
              type="button"
              onClick={() => toggleInsurance(insurance)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                (formData.acceptedInsurance || []).includes(insurance)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-inter font-medium">{insurance}</span>
                {(formData.acceptedInsurance || []).includes(insurance) && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
        
        <div className="text-sm text-gray-600 font-inter">
          Selected: {(formData.acceptedInsurance || []).length} insurance providers
        </div>
      </div>

      {/* Information Note */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-inter font-semibold text-blue-900 mb-2">
          Why This Information Matters
        </h4>
        <ul className="text-blue-800 font-inter text-sm space-y-1">
          <li>• Helps patients find the right care for their needs</li>
          <li>• Improves search visibility and appointment bookings</li>
          <li>• Reduces appointment cancellations due to insurance issues</li>
          <li>• Enables better patient-clinic matching</li>
        </ul>
      </div>

      {/* Quick Setup Options */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-inter font-semibold text-gray-900 mb-3">
          Quick Setup Options
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              const basicServices = ['General Medicine', 'Emergency Care', 'Laboratory Services'];
              setFormData({ ...formData, servicesOffered: basicServices });
            }}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-inter hover:bg-gray-50 transition-colors"
          >
            Basic Clinic Services
          </button>
          <button
            type="button"
            onClick={() => {
              const specialtyServices = ['Cardiology', 'Dermatology', 'Orthopedics', 'Neurology'];
              setFormData({ ...formData, servicesOffered: [...(formData.servicesOffered || []), ...specialtyServices] });
            }}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-inter hover:bg-gray-50 transition-colors"
          >
            Add Specialty Services
          </button>
          <button
            type="button"
            onClick={() => {
              const commonInsurance = ['CNAS (Caisse Nationale des Assurances Sociales)', 'CASNOS (Caisse d\'Assurance Sociale des Non-Salariés)', 'Self-Pay / Cash'];
              setFormData({ ...formData, acceptedInsurance: commonInsurance });
            }}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-inter hover:bg-gray-50 transition-colors"
          >
            Common Insurance Plans
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ClinicServices;