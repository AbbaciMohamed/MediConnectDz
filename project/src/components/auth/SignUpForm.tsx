import React, { useState } from 'react';
import PasswordStrengthBar from './PasswordStrengthBar';
import TermsModal from './TermsModal';
import { User, Mail, Lock, Check, Eye, EyeOff, Info } from 'lucide-react';

const roles = [
  { label: 'Patient', value: 'patient', help: 'Patients can book appointments and manage their health.' },
  { label: 'Doctor', value: 'doctor', help: 'Doctors can manage their profile and appointments.' },
  { label: 'Clinic Admin', value: 'clinic-admin', help: 'Clinic Admins need verification.' },
  { label: 'Provider/Seller', value: 'provider-seller', help: 'Providers can list and sell products.' },
];

const SignUpForm: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    referralCode: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [roleHelp, setRoleHelp] = useState('');
  const [referralStatus, setReferralStatus] = useState<'idle' | 'valid' | 'invalid' | 'checking'>('idle');
  const [termsOpen, setTermsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Simulate AJAX referral code validation
  const validateReferral = (code: string) => {
    setReferralStatus('checking');
    setTimeout(() => {
      if (code === 'HEALTH2024') setReferralStatus('valid');
      else setReferralStatus('invalid');
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    if (name === 'password') setPasswordStrength(getPasswordStrength(value));
    if (name === 'role') {
      const found = roles.find(r => r.value === value);
      setRoleHelp(found ? found.help : '');
    }
    if (name === 'referralCode' && value.length > 0) validateReferral(value);
    if (name === 'referralCode' && value.length === 0) setReferralStatus('idle');
  };

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.fullName) errs.fullName = 'Required';
    else if (form.fullName.length > 50) errs.fullName = 'Max 50 characters';
    if (!form.email) errs.email = 'Required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.password) errs.password = 'Required';
    else if (form.password.length < 8) errs.password = 'Min 8 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Required';
    else if (form.confirmPassword !== form.password) errs.confirmPassword = 'Passwords do not match';
    if (!form.role) errs.role = 'Required';
    if (!form.agreeTerms) errs.agreeTerms = 'You must agree to the terms';
    return errs;
  };

  const errorsNow = validate();
  const isValid = Object.keys(errorsNow).length === 0;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, email: true, password: true, confirmPassword: true, role: true, agreeTerms: true });
    setErrors(errorsNow);
    if (!isValid) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          password: form.password,
          role: form.role,
          referralCode: form.referralCode
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        console.log('Registration successful:', data);
      } else {
        setErrors(errs => ({ ...errs, server: data?.error || 'Registration failed' }));
        console.error('Registration failed:', data);
      }
    } catch (err) {
      setErrors(errs => ({ ...errs, server: 'Network error' }));
      console.error('Network error:', err);
    }
    setSubmitting(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Progress bar (optional, for multi-step) */}
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="fullName"
              name="fullName"
              type="text"
              maxLength={50}
              value={form.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-inter ${touched.fullName && errorsNow.fullName ? 'border-red-400' : touched.fullName && !errorsNow.fullName ? 'border-green-400' : 'border-gray-300'}`}
              placeholder="Your full name"
              aria-describedby="fullName-error"
              required
            />
            {touched.fullName && !errorsNow.fullName && <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />}
          </div>
          {touched.fullName && errorsNow.fullName && <div id="fullName-error" className="text-red-500 text-xs mt-1">{errorsNow.fullName}</div>}
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-inter ${touched.email && errorsNow.email ? 'border-red-400' : touched.email && !errorsNow.email ? 'border-green-400' : 'border-gray-300'}`}
              placeholder="your@email.com"
              aria-describedby="email-error"
              required
            />
            {touched.email && !errorsNow.email && <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />}
          </div>
          {touched.email && errorsNow.email && <div id="email-error" className="text-red-500 text-xs mt-1">{errorsNow.email}</div>}
        </div>
        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-inter ${touched.password && errorsNow.password ? 'border-red-400' : touched.password && !errorsNow.password ? 'border-green-400' : 'border-gray-300'}`}
              placeholder="Create a password"
              aria-describedby="password-error"
              minLength={8}
              required
            />
            <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {touched.password && !errorsNow.password && <Check className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />}
          </div>
          <PasswordStrengthBar strength={passwordStrength} />
          {touched.password && errorsNow.password && <div id="password-error" className="text-red-500 text-xs mt-1">{errorsNow.password}</div>}
        </div>
        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-inter ${touched.confirmPassword && errorsNow.confirmPassword ? 'border-red-400' : touched.confirmPassword && !errorsNow.confirmPassword ? 'border-green-400' : 'border-gray-300'}`}
              placeholder="Confirm your password"
              aria-describedby="confirmPassword-error"
              minLength={8}
              required
            />
            <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {touched.confirmPassword && !errorsNow.confirmPassword && <Check className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />}
          </div>
          {form.confirmPassword && form.confirmPassword === form.password && !errorsNow.confirmPassword && (
            <div className="text-green-600 text-xs mt-1 flex items-center gap-1"><Check className="w-4 h-4" /> Passwords match</div>
          )}
          {touched.confirmPassword && errorsNow.confirmPassword && <div id="confirmPassword-error" className="text-red-500 text-xs mt-1">{errorsNow.confirmPassword}</div>}
        </div>
        {/* Account Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">Account Role</label>
          <div className="relative">
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full py-3 pl-3 pr-10 border rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 font-inter ${touched.role && errorsNow.role ? 'border-red-400' : touched.role && !errorsNow.role ? 'border-green-400' : 'border-gray-300'}`}
              aria-describedby="role-error"
              required
            >
              <option value="" disabled>Select your role</option>
              {roles.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
            {form.role && (
              <button type="button" tabIndex={-1} className="absolute left-0 -bottom-7 flex items-center text-xs text-primary gap-1 cursor-default">
                <Info className="w-4 h-4" /> {roleHelp}
              </button>
            )}
            {touched.role && !errorsNow.role && <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />}
          </div>
          {touched.role && errorsNow.role && <div id="role-error" className="text-red-500 text-xs mt-1">{errorsNow.role}</div>}
        </div>
        {/* Referral Code */}
        <div>
          <label htmlFor="referralCode" className="block text-sm font-medium mb-1">Referral Code <span className="text-gray-400">(optional)</span></label>
          <input
            id="referralCode"
            name="referralCode"
            type="text"
            value={form.referralCode}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-inter"
            placeholder="Enter referral code if any"
            aria-describedby="referralCode-status"
          />
          {form.referralCode && (
            <div id="referralCode-status" className="text-xs mt-1">
              {referralStatus === 'checking' && <span className="text-gray-500">Checking...</span>}
              {referralStatus === 'valid' && <span className="text-green-600 flex items-center gap-1"><Check className="w-4 h-4" /> Valid code!</span>}
              {referralStatus === 'invalid' && <span className="text-red-500">Invalid code.</span>}
            </div>
          )}
        </div>
        {/* Terms & Conditions */}
        <div>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={form.agreeTerms}
              onChange={handleChange}
              onBlur={handleBlur}
              className="rounded mt-1"
              required
            />
            <span>
              I agree to the{' '}
              <button type="button" className="text-primary underline" onClick={() => setTermsOpen(true)}>
                Terms & Conditions and Privacy Policy
              </button>
            </span>
          </label>
          {touched.agreeTerms && errorsNow.agreeTerms && <div className="text-red-500 text-xs mt-1">{errorsNow.agreeTerms}</div>}
        </div>
        {/* Submit Button */}
        {errors.server && <div className="text-red-500 text-xs mb-2">{errors.server}</div>}
        <button
          type="submit"
          className={`w-full bg-primary text-white py-3 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${isValid ? 'hover:bg-primary/90 shadow-md' : 'opacity-60 cursor-not-allowed'}`}
          disabled={!isValid || submitting}
        >
          {submitting ? 'Creating your account…' : 'Sign Up'}
        </button>
      </form>
      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
      {success && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 text-center max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-2 text-primary">Account created!</h2>
            <p className="mb-4">Please check your email to verify your address.</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90" onClick={() => setSuccess(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpForm; 