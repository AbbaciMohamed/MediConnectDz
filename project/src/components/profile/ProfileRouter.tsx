import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import PatientProfile from './PatientProfile';
import DoctorProfile from './DoctorProfile';
import ClinicDashboard from '../dashboard/ClinicDashboard';
import { PatientProfile as PatientProfileType, DoctorProfile as DoctorProfileType, ClinicProfile } from '../../types';

const ProfileRouter: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-jakarta font-bold text-gray-900 mb-4">
            Please log in to view your profile
          </h2>
          <p className="text-gray-600 font-inter">
            You need to be logged in to access your profile page.
          </p>
        </div>
      </div>
    );
  }

  switch (user.role) {
    case 'patient':
      return (
        <PatientProfile 
          patient={{
            ...(user.profile as PatientProfileType),
            email: user.email,
            id: user.id
          }} 
        />
      );
    
    case 'doctor':
      return (
        <DoctorProfile 
          doctor={{
            ...(user.profile as DoctorProfileType),
            email: user.email,
            id: user.id
          }} 
        />
      );
    
    case 'clinic':
      return (
        <ClinicDashboard 
          clinic={{
            ...(user.profile as ClinicProfile),
            email: user.email,
            id: user.id
          }} 
        />
      );
    
    default:
      return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-jakarta font-bold text-gray-900 mb-4">
              Unknown user role
            </h2>
            <p className="text-gray-600 font-inter">
              Unable to determine your user type. Please contact support.
            </p>
          </div>
        </div>
      );
  }
};

export default ProfileRouter;