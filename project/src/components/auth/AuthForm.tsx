import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, User, Eye, EyeOff } from 'lucide-react';

interface AuthFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ isOpen, onClose, mode: initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeTerms: false,
    referralCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});
  const [signupErrors, setSignupErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setLoginErrors({ ...loginErrors, [name]: undefined });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (name === 'password' && value) {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
    setSignupData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setSignupErrors({ ...signupErrors, [name]: undefined });
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const validateLogin = () => {
    const errs: typeof loginErrors = {};
    if (!loginData.email) errs.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(loginData.email)) errs.email = 'Invalid email format';
    if (!loginData.password) errs.password = 'Password is required';
    else if (loginData.password.length < 8) errs.password = 'Password must be at least 8 characters';
    setLoginErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateSignup = () => {
    const errs: typeof signupErrors = {};
    if (!signupData.fullName) errs.fullName = 'Full name is required';
    else if (!/^[A-Za-zÀ-ÿ ']+$/.test(signupData.fullName)) errs.fullName = 'Only letters and spaces allowed';
    if (!signupData.email) errs.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(signupData.email)) errs.email = 'Invalid email format';
    if (!signupData.password) errs.password = 'Password is required';
    else if (signupData.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (!signupData.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (signupData.confirmPassword !== signupData.password) errs.confirmPassword = 'Passwords do not match';
    if (!signupData.role) errs.role = 'Please select a role';
    if (!signupData.agreeTerms) errs.agreeTerms = 'You must agree to the terms';
    setSignupErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin()) {
      // submit logic
      // console.log('Login submitted:', loginData);
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignup()) {
      // submit logic
      // console.log('Signup submitted:', signupData);
    }
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 2) return 'bg-red-500';
    if (strength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength <= 2) return 'Weak';
    if (strength === 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden"
      >
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-2 opacity-90">
            {mode === 'login' 
              ? 'Sign in to continue your journey' 
              : 'Join us to get started'}
          </p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} noValidate>
              {/* Email */}
              <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="login-email">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent ${loginErrors.email ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                {loginErrors.email && <div className="text-red-500 text-xs mt-1">{loginErrors.email}</div>}
              </div>

              {/* Password */}
              <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="login-password">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent ${loginErrors.password ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="••••••••"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {loginErrors.password && <div className="text-red-500 text-xs mt-1">{loginErrors.password}</div>}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={loginData.remember}
                    onChange={handleLoginChange}
                    className="h-4 w-4 text-primary rounded focus:ring-primary/50 border-gray-300"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* OAuth Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2 text-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor" />
                  </svg>
                  Facebook
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} noValidate>
              {/* Full Name */}
              <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="signup-fullName">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="signup-fullName"
                    type="text"
                    name="fullName"
                    value={signupData.fullName}
                    onChange={handleSignupChange}
                    className={`w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent ${signupErrors.fullName ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="John Doe"
                    pattern="[A-Za-zÀ-ÿ ']+"
                    required
                  />
                </div>
                {signupErrors.fullName && <div className="text-red-500 text-xs mt-1">{signupErrors.fullName}</div>}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="signup-email">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className={`w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent ${signupErrors.email ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                {signupErrors.email && <div className="text-red-500 text-xs mt-1">{signupErrors.email}</div>}
              </div>

              {/* Password */}
              <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="signup-password">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className={`w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent ${signupErrors.password ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="••••••••"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {/* Password Strength Meter */}
                {signupData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Password strength</span>
                      <span className={`text-xs font-medium ${getPasswordStrengthColor(passwordStrength)}`}>
                        {getPasswordStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${getPasswordStrengthColor(passwordStrength)}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                {signupErrors.password && <div className="text-red-500 text-xs mt-1">{signupErrors.password}</div>}
              </div>

              {/* Confirm Password */}
              <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="signup-confirmPassword">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="signup-confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    className={`w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent ${signupErrors.confirmPassword ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="••••••••"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {signupErrors.confirmPassword && <div className="text-red-500 text-xs mt-1">{signupErrors.confirmPassword}</div>}
              </div>

              {/* Account Role */}
              <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="signup-role">Account Role</label>
                <div className="relative">
                  <select
                    id="signup-role"
                    name="role"
                    value={signupData.role}
                    onChange={handleSignupChange}
                    className={`w-full py-3 pl-3 pr-10 border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent ${signupErrors.role ? 'border-red-400' : 'border-gray-300'}`}
                    required
                  >
                    <option value="" disabled>Select your role</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="clinic-admin">Clinic Admin</option>
                    <option value="provider-seller">Provider/Seller</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {signupErrors.role && <div className="text-red-500 text-xs mt-1">{signupErrors.role}</div>}
              </div>

              {/* Terms & Conditions */}
              <div className="mb-5">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={signupData.agreeTerms}
                      onChange={handleSignupChange}
                      className="h-4 w-4 text-primary rounded focus:ring-primary/50 border-gray-300"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeTerms" className="text-gray-700">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms & Conditions</a>
                    </label>
                  </div>
                </div>
                {signupErrors.agreeTerms && <div className="text-red-500 text-xs mt-1">{signupErrors.agreeTerms}</div>}
              </div>

              {/* Referral Code */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="signup-referralCode">
                  Referral Code <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  id="signup-referralCode"
                  type="text"
                  name="referralCode"
                  value={signupData.referralCode}
                  onChange={handleSignupChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  placeholder="Enter referral code if any"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Sign Up
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button 
                  onClick={() => setMode('signup')} 
                  className="text-primary font-semibold hover:underline"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button 
                  onClick={() => setMode('login')} 
                  className="text-primary font-semibold hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm; 