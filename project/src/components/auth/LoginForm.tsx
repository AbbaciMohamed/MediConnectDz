import React, { useState } from 'react';

interface LoginFormProps {
  onLogin?: (email: string, password: string, remember: boolean) => void;
}


const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; server?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email) {
      errs.email = 'Email is required';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      errs.email = 'Invalid email format';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember })
      });
      const data = await res.json();
      if (res.ok) {
        // Store token in local storage or context
        localStorage.setItem('authToken', data.token);
        console.log('Login successful:', data);
        if (onLogin) onLogin(email, password, remember);
      } else {
        setErrors(errs => ({ ...errs, server: data?.error || 'Login failed' }));
        console.error('Login failed:', data);
      }
    } catch (err) {
      setErrors(errs => ({ ...errs, server: 'Network error' }));
      console.error('Network error:', err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 font-inter ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
          placeholder="you@email.com"
        />
        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 font-inter ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
            placeholder="Your password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            onClick={() => setShowPassword(v => !v)}
            tabIndex={-1}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
            className="rounded"
          />
          Remember Me
        </label>
        <a href="#" className="text-primary text-sm hover:underline">Forgot Password?</a>
      </div>
      {/* Optional: Social login buttons */}
      <div className="flex flex-col gap-2">
        <button type="button" className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50">
          <span>🔵</span> Continue with Google
        </button>
        <button type="button" className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50">
          <span>🔵</span> Continue with Facebook
        </button>
      </div>
      {errors.server && <div className="text-red-500 text-xs mb-2">{errors.server}</div>}
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200"
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm; 