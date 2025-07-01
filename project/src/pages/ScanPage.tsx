import React from 'react';
import DocumentScanner from '../components/scan/DocumentScanner';

const ScanPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DocumentScanner />
    </div>
  );
};

export default ScanPage; 