import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Upload, FileText, Shield, Award } from 'lucide-react';

interface ClinicLicensingProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;
}

const ClinicLicensing: React.FC<ClinicLicensingProps> = ({ formData, setFormData, errors }) => {
  const algerianCities = [
    'Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Djelfa', 'Sétif',
    'Sidi Bel Abbès', 'Biskra', 'Tébessa', 'El Oued', 'Skikda', 'Tiaret', 'Béjaïa',
    'Tlemcen', 'Ouargla', 'Mostaganem', 'Bordj Bou Arréridj', 'Chlef', 'Médéa'
  ];

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setFormData({ ...formData, licenseDocument: files[0] });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-3">
          Location & Licensing
        </h3>
        <p className="text-gray-600 font-inter">
          Provide your clinic address and upload your medical license for verification.
        </p>
      </div>

      {/* Clinic Address */}
      <div className="space-y-4">
        <h4 className="text-lg font-jakarta font-semibold text-neutral-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-primary" />
          Clinic Address
        </h4>
        
        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            required
            value={formData.clinicAddress?.street || ''}
            onChange={(e) => setFormData({ 
              ...formData, 
              clinicAddress: { ...formData.clinicAddress, street: e.target.value }
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
              errors.street ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="123 Medical District Street"
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
              value={formData.clinicAddress?.city || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                clinicAddress: { ...formData.clinicAddress, city: e.target.value }
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
              value={formData.clinicAddress?.postalCode || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                clinicAddress: { ...formData.clinicAddress, postalCode: e.target.value }
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
            value={formData.clinicAddress?.country || 'Algeria'}
            onChange={(e) => setFormData({ 
              ...formData, 
              clinicAddress: { ...formData.clinicAddress, country: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter"
            placeholder="Algeria"
          />
        </div>
      </div>

      {/* Medical License */}
      <div className="space-y-4">
        <h4 className="text-lg font-jakarta font-semibold text-neutral-900 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-primary" />
          Medical License & Accreditation
        </h4>

        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
            Medical License Number *
          </label>
          <input
            type="text"
            required
            value={formData.licenseNumber || ''}
            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter ${
              errors.licenseNumber ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="License/Accreditation ID"
          />
          {errors.licenseNumber && <p className="text-red-600 text-sm mt-1">{errors.licenseNumber}</p>}
          <p className="text-xs text-gray-500 mt-1">
            Your official medical license or healthcare facility accreditation number
          </p>
        </div>

        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
            License Document Upload *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-primary transition-colors duration-300 bg-gray-50 hover:bg-primary/5">
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h4 className="font-jakarta font-semibold text-gray-700 mb-2">
              Upload License Document
            </h4>
            <p className="text-sm text-gray-600 font-inter mb-4">
              Upload your medical license, healthcare facility permit, or accreditation certificate
            </p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="license-upload"
            />
            <label
              htmlFor="license-upload"
              className="bg-primary text-white px-6 py-3 rounded-lg font-inter font-semibold hover:bg-primary/90 transition-colors cursor-pointer inline-flex items-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </label>
            <p className="text-xs text-gray-500 mt-3">
              Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
            </p>
          </div>

          {formData.licenseDocument && (
            <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-primary mr-3" />
                <div className="flex-1">
                  <p className="font-inter font-medium text-gray-900">{formData.licenseDocument.name}</p>
                  <p className="text-xs text-gray-500">
                    {(formData.licenseDocument.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, licenseDocument: null })}
                  className="text-red-600 hover:text-red-800 font-inter text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Verification Info */}
      <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
        <div className="flex items-start">
          <Award className="w-6 h-6 text-yellow-600 mr-4 mt-1" />
          <div>
            <h4 className="font-jakarta font-semibold text-yellow-900 mb-3">
              License Verification Process
            </h4>
            <div className="text-yellow-800 font-inter text-sm space-y-2">
              <p><strong>Step 1:</strong> Document review by our medical verification team</p>
              <p><strong>Step 2:</strong> Cross-reference with official medical registries</p>
              <p><strong>Step 3:</strong> Verification call to confirm clinic details</p>
              <p><strong>Step 4:</strong> Approval and platform activation</p>
              <p className="mt-3 text-xs">
                <strong>Timeline:</strong> Verification typically takes 2-3 business days. 
                You'll receive email updates throughout the process.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-inter font-semibold text-blue-900 mb-2">
          Why We Verify Licenses
        </h4>
        <ul className="text-blue-800 font-inter text-sm space-y-1">
          <li>• Ensure patient safety and trust</li>
          <li>• Comply with healthcare regulations</li>
          <li>• Maintain platform quality standards</li>
          <li>• Protect against fraudulent providers</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ClinicLicensing;