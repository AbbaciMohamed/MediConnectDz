import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Check } from 'lucide-react';

interface SupplierAddressProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;
  firstInputRef?: React.RefObject<HTMLInputElement>;
}

const SupplierAddress: React.FC<SupplierAddressProps> = ({ formData, setFormData, errors, firstInputRef }) => {
  const drugCategories = [
    'Antibiotics', 'Vaccines', 'Oncology', 'Cardiology', 'Neurology', 
    'Dermatology', 'Pediatrics', 'Pain Management', 'Mental Health', 
    'Diabetes Care', 'Respiratory', 'Gastroenterology', 'Orthopedics', 
    'Emergency Medicine', 'Surgical Supplies', 'Medical Devices', 'Other'
  ];

  const algerianCities = [
    'Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Djelfa', 'Sétif',
    'Sidi Bel Abbès', 'Biskra', 'Tébessa', 'El Oued', 'Skikda', 'Tiaret', 'Béjaïa',
    'Tlemcen', 'Ouargla', 'Mostaganem', 'Bordj Bou Arréridj', 'Chlef', 'Médéa'
  ];

  const toggleCategory = (category: string) => {
    const currentCategories = formData.drugCategories || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter((c: string) => c !== category)
      : [...currentCategories, category];
    
    setFormData({ 
      ...formData, 
      drugCategories: newCategories 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-3">
          Address & Categories
        </h3>
        <p className="text-gray-600 font-inter">
          Provide your company address and select the drug categories you specialize in.
        </p>
      </div>

      {/* Company Address */}
      <div className="space-y-4">
        <h4 className="text-lg font-jakarta font-semibold text-neutral-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-primary" />
          Company Address
        </h4>
        
        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
            Street Address *
          </label>
          <input
            ref={firstInputRef}
            type="text"
            required
            value={formData.companyAddress?.street || ''}
            onChange={(e) => setFormData({ 
              ...formData, 
              companyAddress: { ...formData.companyAddress, street: e.target.value }
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
              errors.street ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="123 Business District Street"
          />
          {errors.street && <p className="text-red-600 text-sm mt-1">{errors.street}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
              City *
            </label>
            <select
              required
              value={formData.companyAddress?.city || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                companyAddress: { ...formData.companyAddress, city: e.target.value }
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
                errors.city ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select city</option>
              {algerianCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
              Postal Code
            </label>
            <input
              type="text"
              value={formData.companyAddress?.postalCode || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                companyAddress: { ...formData.companyAddress, postalCode: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter"
              placeholder="16000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            value={formData.companyAddress?.country || 'Algeria'}
            onChange={(e) => setFormData({ 
              ...formData, 
              companyAddress: { ...formData.companyAddress, country: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter"
            placeholder="Algeria"
          />
        </div>
      </div>

      {/* Drug Categories */}
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-jakarta font-semibold text-neutral-900 mb-2">
            Drug Categories & Specialties *
          </h4>
          <p className="text-gray-600 font-inter text-sm mb-4">
            Select all categories that apply to your business. This helps clinics find you for relevant tenders.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {drugCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                (formData.drugCategories || []).includes(category)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-inter font-medium">{category}</span>
                {(formData.drugCategories || []).includes(category) && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
        
        {errors.drugCategories && <p className="text-red-600 text-sm mt-2">{errors.drugCategories}</p>}
        
        <div className="text-sm text-gray-600 font-inter">
          Selected: {(formData.drugCategories || []).length} categories
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-inter font-semibold text-blue-900 mb-2">
          Why We Need This Information
        </h4>
        <ul className="text-blue-800 font-inter text-sm space-y-1">
          <li>• Address verification for business legitimacy</li>
          <li>• Category matching for relevant tender notifications</li>
          <li>• Geographic proximity for local partnerships</li>
          <li>• Compliance with regulatory requirements</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default SupplierAddress;