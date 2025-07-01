import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
  isEmailVerified: boolean;
  sendEmailVerification: (email: string) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('healthland_user');
    const rememberMe = localStorage.getItem('healthland_remember_me');
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const sessionExpiry = localStorage.getItem('healthland_session_expiry');
      
      if (sessionExpiry) {
        const expiryDate = new Date(sessionExpiry);
        const now = new Date();
        
        if (now < expiryDate) {
          setUser(userData);
          setIsEmailVerified(true);
        } else {
          // Session expired
          localStorage.removeItem('healthland_user');
          localStorage.removeItem('healthland_session_expiry');
          localStorage.removeItem('healthland_remember_me');
        }
      } else if (rememberMe === 'true') {
        // Remember me is enabled, keep user logged in
        setUser(userData);
        setIsEmailVerified(true);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      // TODO: Map backend response to User type as needed
      // Example: setUser(data.user); localStorage.setItem('token', data.token);
      setIsEmailVerified(true);
    } catch (error) {
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsEmailVerified(false);
    localStorage.removeItem('healthland_user');
    localStorage.removeItem('healthland_session_expiry');
    localStorage.removeItem('healthland_remember_me');
  };

  const sendEmailVerification = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate sending verification email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would send an actual email
      console.log(`Verification email sent to ${email}`);
      
      // Store pending verification
      localStorage.setItem('healthland_pending_verification', email);
      
    } catch (error) {
      throw new Error('Failed to send verification email');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    setIsLoading(true);
    try {
      // Simulate email verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock verification - in real app, this would verify with backend
      if (code === '123456') {
        setIsEmailVerified(true);
        localStorage.removeItem('healthland_pending_verification');
      } else {
        throw new Error('Invalid verification code');
      }
      
    } catch (error) {
      throw new Error('Email verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!res.ok) throw new Error('Registration failed');
      const data = await res.json();
      // TODO: Map backend response to User type as needed
      // Example: setUser(data.user); localStorage.setItem('token', data.token);
      setIsEmailVerified(true);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register, 
      isLoading, 
      isEmailVerified,
      sendEmailVerification,
      verifyEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};