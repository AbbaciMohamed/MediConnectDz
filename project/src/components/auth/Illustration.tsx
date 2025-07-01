import React from 'react';
import { CheckCircle } from 'lucide-react';

const features = [
  'Secure medical supply management',
  'Direct access to verified providers',
  'Real-time order tracking',
  'Dedicated support team',
];

const Illustration: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex flex-col items-center ${className || ''}`}>
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64 mb-6">
      <circle cx="150" cy="150" r="140" fill="#E0F7FA" />
      <ellipse cx="100" cy="180" rx="40" ry="20" fill="#2faaa1" opacity="0.3" />
      <ellipse cx="200" cy="180" rx="40" ry="20" fill="#2faaa1" opacity="0.3" />
      <rect x="90" y="120" width="120" height="60" rx="30" fill="#2faaa1" />
      <circle cx="120" cy="120" r="20" fill="#fff" />
      <circle cx="180" cy="120" r="20" fill="#fff" />
      <rect x="135" y="140" width="30" height="30" rx="15" fill="#fff" />
      <rect x="120" y="170" width="60" height="15" rx="7.5" fill="#fff" />
      <text x="150" y="270" textAnchor="middle" fill="#2faaa1" fontSize="20" fontWeight="bold">HealthLand</text>
    </svg>
    <h1 className="text-3xl font-bold mb-2 text-center">Join HealthLand Today</h1>
    <p className="text-lg text-center opacity-90 mb-6">Connect with providers, post requirements, and manage orders—all in one place.</p>
    <div className="w-full max-w-xs">
      {features.map((feature, idx) => (
        <div key={feature} className="flex items-center gap-2 mb-2 text-white/90">
          <CheckCircle className="w-5 h-5 text-white" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Illustration; 