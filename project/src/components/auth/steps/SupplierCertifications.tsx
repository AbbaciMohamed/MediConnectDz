import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Globe, Linkedin, Award, Shield } from 'lucide-react';

interface SupplierCertificationsProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;
}

const SupplierCertifications: React.FC<SupplierCertificationsProps> = ({ 
  formData, 
  setFormData, 
  errors 
}) => {
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    setFormData({ 
      ...formData, 
      certifications: [...(formData.certifications || []), ...fileArray] 
    });
  };

  const removeFile = (index: number) => {
    const newFiles = (formData.certifications || []).filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, certifications: newFiles });
  };

  const acceptedFileTypes = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-3">
          Certifications & Documents
        </h3>
        <p className="text-gray-600 font-inter">
          Upload your certifications and provide additional company information to complete verification.
        </p>
      </div>

      {/* File Upload Section */}
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-jakarta font-semibold text-neutral-900 mb-2 flex items-center">
            <Award className="w-5 h-5 mr-2 text-primary" />
            Certifications Upload
          </h4>
          <p className="text-gray-600 font-inter text-sm mb-4">
            Upload your company certifications, licenses, and quality documents (PDF, images, or documents)
          </p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary transition-colors duration-300 bg-gray-50 hover:bg-primary/5">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-jakarta font-semibold text-gray-700 mb-2">
            Upload Certifications
          </h4>
          <p className="text-sm text-gray-600 font-inter mb-4">
            COA, GMP certificates, ISO docs, business licenses, quality certifications
          </p>
          <input
            type="file"
            multiple
            accept={acceptedFileTypes}
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
            id="certifications-upload"
          />
          <label
            htmlFor="certifications-upload"
            className="bg-primary text-white px-6 py-3 rounded-lg font-inter font-semibold hover:bg-primary/90 transition-colors cursor-pointer inline-flex items-center"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Files
          </label>
          <p className="text-xs text-gray-500 mt-3">
            Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)
          </p>
        </div>

        {/* Uploaded Files */}
        {(formData.certifications || []).length > 0 && (
          <div className="space-y-3">
            <h5 className="font-inter font-semibold text-gray-900">
              Uploaded Files ({(formData.certifications || []).length})
            </h5>
            <div className="space-y-2">
              {(formData.certifications || []).map((file: File, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="font-inter font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-800 font-inter text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Required Certifications Checklist */}
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h5 className="font-inter font-semibold text-yellow-900 mb-3">
            Recommended Certifications
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-yellow-800">
            <div>• GMP (Good Manufacturing Practice)</div>
            <div>• ISO 9001 Quality Management</div>
            <div>• WHO Prequalification</div>
            <div>• Business Registration Certificate</div>
            <div>• Import/Export License</div>
            <div>• Product Certificates of Analysis</div>
          </div>
        </div>
      </div>

      {/* Company URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
            Company Website (Optional)
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="url"
              value={formData.website || ''}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter"
              placeholder="https://company.com"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Your official company website for verification
          </p>
        </div>

        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
            LinkedIn Company Page (Optional)
          </label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="url"
              value={formData.linkedinUrl || ''}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-primary/30 focus:border-primary font-inter"
              placeholder="https://linkedin.com/company/..."
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Professional network presence for credibility
          </p>
        </div>
      </div>

      {/* Verification Process Info */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start">
          <Shield className="w-6 h-6 text-blue-600 mr-4 mt-1" />
          <div>
            <h4 className="font-jakarta font-semibold text-blue-900 mb-3">
              Verification Process
            </h4>
            <div className="text-blue-800 font-inter text-sm space-y-2">
              <p><strong>Step 1:</strong> Document review (1-2 business days)</p>
              <p><strong>Step 2:</strong> Company verification call</p>
              <p><strong>Step 3:</strong> Approval and marketplace access</p>
              <p className="mt-3 text-xs">
                <strong>Note:</strong> Verified suppliers get priority listing and direct access to exclusive tenders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SupplierCertifications;