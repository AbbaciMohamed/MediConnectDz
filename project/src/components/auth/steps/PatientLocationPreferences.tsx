import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Bell, Mail } from 'lucide-react';

interface PatientLocationPreferencesProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;
  firstInputRef?: React.RefObject<HTMLInputElement>;
}

const PatientLocationPreferences: React.FC<PatientLocationPreferencesProps> = ({ 
  formData, 
  setFormData, 
  errors, 
  firstInputRef
}) => {
  const algerianCities = [
    'Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Djelfa', 'Sétif',
    'Sidi Bel Abbès', 'Biskra', 'Tébessa', 'El Oued', 'Skikda', 'Tiaret', 'Béjaïa',
    'Tlemcen', 'Ouargla', 'Mostaganem', 'Bordj Bou Arréridj', 'Chlef', 'Médéa',
    'El Tarf', 'Mascara', 'Ouled Djellal', 'Relizane', 'El Bayadh'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-3">
          Location & Preferences
        </h3>
        <p className="text-gray-600 font-inter">
          Help us personalize your experience and find the best healthcare providers near you.
        </p>
      </div>

      <div>
        <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
          City/Region *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            required
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
              errors.location ? 'border-red-300' : 'border-gray-300'
            }`}
            ref={firstInputRef}
          >
            <option value="">Select your city</option>
            {algerianCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
        <p className="text-xs text-gray-500 mt-1">
          This helps us show you nearby clinics and healthcare providers
        </p>
      </div>

      <div>
        <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
          Date of Birth (Optional)
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Used for age-appropriate health recommendations and reminders
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-jakarta font-semibold text-neutral-900">
          Communication Preferences
        </h4>
        <p className="text-gray-600 font-inter text-sm">
          Choose how you'd like to receive updates and reminders from HealthLand.
        </p>

        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="receiveNewsletter"
              checked={formData.receiveNewsletter || false}
              onChange={(e) => setFormData({ ...formData, receiveNewsletter: e.target.checked })}
              className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <div className="flex-1">
              <label htmlFor="receiveNewsletter" className="flex items-center text-sm font-inter font-medium text-gray-900 cursor-pointer">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                Email Newsletter
              </label>
              <p className="text-xs text-gray-600 mt-1">
                Receive health tips, clinic updates, and platform news via email
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="receiveSMS"
              checked={formData.receiveSMS || false}
              onChange={(e) => setFormData({ ...formData, receiveSMS: e.target.checked })}
              className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <div className="flex-1">
              <label htmlFor="receiveSMS" className="flex items-center text-sm font-inter font-medium text-gray-900 cursor-pointer">
                <Bell className="w-4 h-4 mr-2 text-primary" />
                SMS Appointment Reminders
              </label>
              <p className="text-xs text-gray-600 mt-1">
                Get text message reminders for upcoming appointments (requires phone number)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-inter font-semibold text-blue-900 mb-2">
          Privacy & Security
        </h4>
        <p className="text-blue-800 font-inter text-sm">
          Your personal information is protected with bank-level encryption. We never share your data with third parties without your explicit consent.
        </p>
      </div>
    </motion.div>
  );
};

export default PatientLocationPreferences;