import React from 'react';

const getColor = (strength: number) => {
  if (strength <= 2) return 'bg-red-500';
  if (strength === 3) return 'bg-yellow-500';
  if (strength >= 4) return 'bg-green-500';
  return 'bg-gray-200';
};

const getText = (strength: number) => {
  if (strength <= 2) return 'Weak';
  if (strength === 3) return 'Fair';
  if (strength >= 4) return 'Strong';
  return '';
};

const PasswordStrengthBar: React.FC<{ strength: number }> = ({ strength }) => (
  <div className="mt-2">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs text-gray-500">Password strength</span>
      <span className={`text-xs font-medium ${getColor(strength)}`}>{getText(strength)}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div
        className={`h-1.5 rounded-full transition-all duration-300 ${getColor(strength)}`}
        style={{ width: `${(strength / 5) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default PasswordStrengthBar; 