import React from 'react';
import { motion } from 'framer-motion';
import { User, Building, Package, Check, Star, Shield, Award } from 'lucide-react';

interface RoleSelectionProps {
  selectedRole: 'patient' | 'clinic' | 'supplier' | null;
  onRoleSelect: (role: 'patient' | 'clinic' | 'supplier') => void;
  errors: Record<string, string>;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ selectedRole, onRoleSelect, errors }) => {
  const roles = [
    {
      id: 'patient' as const,
      title: 'Patient / Visitor',
      description: 'Find and book appointments with healthcare providers',
      icon: User,
      color: 'from-blue-500 to-blue-600',
      features: [
        'Find clinics and specialists',
        'Book appointments instantly',
        'Secure messaging with doctors',
        'Family health management',
        'Emergency services access'
      ],
      stats: '50K+ patients trust us',
      badge: 'Most Popular'
    },
    {
      id: 'clinic' as const,
      title: 'Healthcare Provider',
      description: 'Manage your clinic and connect with patients',
      icon: Building,
      color: 'from-primary to-primary/80',
      features: [
        '14-day free trial',
        'Patient management system',
        'Security Medicine Suite',
        'Analytics dashboard',
        'Online appointment booking'
      ],
      stats: '500+ clinics registered',
      badge: 'Free Trial'
    },
    {
      id: 'supplier' as const,
      title: 'Medicine Supplier',
      description: 'Access tenders and connect with healthcare providers',
      icon: Package,
      color: 'from-green-500 to-green-600',
      features: [
        'Access exclusive tenders',
        'Direct clinic communication',
        'Verification program',
        'Marketplace listing',
        'Business growth tools'
      ],
      stats: '300+ suppliers verified',
      badge: 'Verified Network'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-jakarta font-bold text-neutral-900 mb-3">
          Choose Your Role
        </h3>
        <p className="text-gray-600 font-inter text-lg">
          Select the option that best describes you to get started with the right features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => onRoleSelect(role.id)}
            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group hover:scale-105 ${
              selectedRole === role.id
                ? 'border-primary bg-primary/5 shadow-xl'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
            }`}
          >
            {/* Badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-inter font-bold ${
                role.id === 'patient' ? 'bg-blue-100 text-blue-800' :
                role.id === 'clinic' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {role.id === 'patient' && <Star className="w-3 h-3 mr-1" />}
                {role.id === 'clinic' && <Award className="w-3 h-3 mr-1" />}
                {role.id === 'supplier' && <Shield className="w-3 h-3 mr-1" />}
                {role.badge}
              </span>
            </div>

            {/* Icon */}
            <div className={`bg-gradient-to-r ${role.color} p-4 rounded-xl mb-4 w-fit group-hover:scale-110 transition-transform duration-300`}>
              <role.icon className="w-8 h-8 text-white" />
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-jakarta font-bold text-neutral-900 mb-2">
                  {role.title}
                </h4>
                <p className="text-gray-600 font-inter">
                  {role.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2">
                {role.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="font-inter">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="pt-3 border-t border-gray-100">
                <span className="text-sm font-inter font-medium text-gray-500">
                  {role.stats}
                </span>
              </div>
            </div>

            {/* Selection indicator */}
            {selectedRole === role.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 bg-primary text-white rounded-full p-1"
              >
                <Check className="w-4 h-4" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {errors.role && (
        <div className="text-center">
          <p className="text-red-600 font-inter text-sm">{errors.role}</p>
        </div>
      )}

      {/* Additional info */}
      <div className="bg-gray-50 rounded-2xl p-6 text-center">
        <h4 className="font-jakarta font-semibold text-neutral-900 mb-2">
          Not sure which option to choose?
        </h4>
        <p className="text-gray-600 font-inter text-sm">
          You can always update your account type later. Start with the option that best fits your current needs.
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;