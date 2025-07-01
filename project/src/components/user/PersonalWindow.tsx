import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../types';

const PersonalWindow = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) throw new Error('User not logged in');
        const res = await fetch(`/api/users/${user.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data: User = await res.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const getProfileName = () => {
    if (!userData) return '';
    if ('firstName' in userData.profile) {
      return `${userData.profile.firstName} ${userData.profile.lastName}`;
    }
    if ('name' in userData.profile) {
      return userData.profile.name;
    }
    return 'User';
  };

  const getSubscriptionType = () => {
    if (!userData) return 'N/A';
    if ('subscription' in userData.profile) {
      return userData.profile.subscription.type;
    }
    return 'N/A';
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return null;

  return (
    <div className="personal-window">
      <h2>Welcome, {getProfileName()}</h2>
      <p>Role: {userData.role}</p>
      <p>Subscription: {getSubscriptionType()}</p>
      {/* Role-specific features */}
      {userData.role === 'patient' && <div>Patient-specific features</div>}
      {userData.role === 'clinic' && <div>Clinic-specific features</div>}
      {userData.role === 'doctor' && <div>Doctor-specific features</div>}
    </div>
  );
};

export default PersonalWindow;
