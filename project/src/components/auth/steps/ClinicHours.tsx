import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Info } from 'lucide-react';

interface ClinicHoursProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;
}

const ClinicHours: React.FC<ClinicHoursProps> = ({ formData, setFormData, errors }) => {
  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const updateOperatingHours = (day: string, field: string, value: string | boolean) => {
    const currentHours = formData.operatingHours || {};
    const updatedHours = {
      ...currentHours,
      [day]: {
        ...currentHours[day],
        [field]: value
      }
    };
    setFormData({ ...formData, operatingHours: updatedHours });
  };

  const setPresetHours = (preset: string) => {
    let presetHours = {};
    
    switch (preset) {
      case 'standard':
        presetHours = {
          monday: { open: '08:00', close: '17:00', isOpen: true },
          tuesday: { open: '08:00', close: '17:00', isOpen: true },
          wednesday: { open: '08:00', close: '17:00', isOpen: true },
          thursday: { open: '08:00', close: '17:00', isOpen: true },
          friday: { open: '08:00', close: '17:00', isOpen: true },
          saturday: { open: '08:00', close: '14:00', isOpen: true },
          sunday: { open: '08:00', close: '14:00', isOpen: false }
        };
        break;
      case 'extended':
        presetHours = {
          monday: { open: '07:00', close: '20:00', isOpen: true },
          tuesday: { open: '07:00', close: '20:00', isOpen: true },
          wednesday: { open: '07:00', close: '20:00', isOpen: true },
          thursday: { open: '07:00', close: '20:00', isOpen: true },
          friday: { open: '07:00', close: '20:00', isOpen: true },
          saturday: { open: '08:00', close: '18:00', isOpen: true },
          sunday: { open: '09:00', close: '15:00', isOpen: true }
        };
        break;
      case '24/7':
        presetHours = {
          monday: { open: '00:00', close: '23:59', isOpen: true },
          tuesday: { open: '00:00', close: '23:59', isOpen: true },
          wednesday: { open: '00:00', close: '23:59', isOpen: true },
          thursday: { open: '00:00', close: '23:59', isOpen: true },
          friday: { open: '00:00', close: '23:59', isOpen: true },
          saturday: { open: '00:00', close: '23:59', isOpen: true },
          sunday: { open: '00:00', close: '23:59', isOpen: true }
        };
        break;
    }
    
    setFormData({ ...formData, operatingHours: presetHours });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-3">
          Operating Hours
        </h3>
        <p className="text-gray-600 font-inter">
          Set your clinic's operating hours to help patients know when you're available for appointments.
        </p>
      </div>

      {/* Quick Presets */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-inter font-semibold text-gray-900 mb-3 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-primary" />
          Quick Setup Presets
        </h4>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setPresetHours('standard')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-inter hover:bg-gray-50 transition-colors"
          >
            Standard Hours (8AM-5PM)
          </button>
          <button
            type="button"
            onClick={() => setPresetHours('extended')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-inter hover:bg-gray-50 transition-colors"
          >
            Extended Hours (7AM-8PM)
          </button>
          <button
            type="button"
            onClick={() => setPresetHours('24/7')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-inter hover:bg-gray-50 transition-colors"
          >
            24/7 Emergency
          </button>
        </div>
      </div>

      {/* Operating Hours Configuration */}
      <div className="space-y-4">
        <h4 className="text-lg font-jakarta font-semibold text-neutral-900 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-primary" />
          Weekly Schedule
        </h4>
        
        <div className="space-y-4">
          {daysOfWeek.map((day) => {
            const dayHours = formData.operatingHours?.[day.key] || { open: '09:00', close: '17:00', isOpen: true };
            
            return (
              <div key={day.key} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={`${day.key}-open`}
                      checked={dayHours.isOpen}
                      onChange={(e) => updateOperatingHours(day.key, 'isOpen', e.target.checked)}
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor={`${day.key}-open`} className="text-lg font-jakarta font-semibold text-neutral-900 cursor-pointer">
                      {day.label}
                    </label>
                  </div>
                  
                  {!dayHours.isOpen && (
                    <span className="text-sm text-gray-500 font-inter bg-gray-100 px-3 py-1 rounded-full">
                      Closed
                    </span>
                  )}
                </div>
                
                {dayHours.isOpen && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                        Opening Time
                      </label>
                      <input
                        type="time"
                        value={dayHours.open}
                        onChange={(e) => updateOperatingHours(day.key, 'open', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                        Closing Time
                      </label>
                      <input
                        type="time"
                        value={dayHours.close}
                        onChange={(e) => updateOperatingHours(day.key, 'close', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-inter"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Information Notes */}
      <div className="space-y-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-inter font-semibold text-blue-900 mb-2">
                Operating Hours Guidelines
              </h4>
              <ul className="text-blue-800 font-inter text-sm space-y-1">
                <li>• These hours will be displayed to patients on your clinic profile</li>
                <li>• You can update your hours anytime from your dashboard</li>
                <li>• Emergency clinics can set 24/7 availability</li>
                <li>• Consider lunch breaks and appointment scheduling when setting hours</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h4 className="font-inter font-semibold text-yellow-900 mb-2">
            Special Considerations
          </h4>
          <div className="text-yellow-800 font-inter text-sm space-y-1">
            <p>• <strong>Holidays:</strong> You can set special holiday hours from your dashboard</p>
            <p>• <strong>Emergency Services:</strong> If you offer emergency care, consider extended or 24/7 hours</p>
            <p>• <strong>Appointment Slots:</strong> Your booking system will automatically respect these hours</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClinicHours;