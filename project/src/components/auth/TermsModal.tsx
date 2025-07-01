import React, { useRef, useState } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  if (!isOpen) return null;

  const handleScroll = () => {
    const el = contentRef.current;
    if (el && el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      setScrolledToBottom(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
        <h2 className="text-2xl font-bold mb-4 text-primary">Terms & Conditions</h2>
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="overflow-y-auto max-h-64 border p-4 rounded mb-6 text-sm text-gray-700"
          tabIndex={0}
        >
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, nec dictum nisi nisl euismod enim. Mauris euismod, nisi eu tincidunt consectetur, nisi nisl aliquam enim, nec dictum nisi nisl euismod enim. Mauris euismod, nisi eu tincidunt consectetur, nisi nisl aliquam enim, nec dictum nisi nisl euismod enim.</p>
          <p>By using this service, you agree to the following terms and conditions. Please read them carefully before proceeding.</p>
          <p>1. You must be at least 18 years old to use this service.</p>
          <p>2. You are responsible for maintaining the confidentiality of your account and password.</p>
          <p>3. You agree not to use the service for any unlawful or prohibited activities.</p>
          <p>4. The service is provided "as is" without warranty of any kind.</p>
          <p>5. We reserve the right to update these terms at any time.</p>
          <p>Thank you for choosing HealthLand!</p>
        </div>
        <button
          className={`w-full bg-primary text-white py-3 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${scrolledToBottom ? 'hover:bg-primary/90' : 'opacity-60 cursor-not-allowed'}`}
          onClick={onClose}
          disabled={!scrolledToBottom}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsModal; 