import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      addToast('Please fill in all fields', 'error'); return;
    }
    if (formData.password !== formData.confirmPassword) {
      addToast('Passwords do not match', 'error'); return;
    }
    if (formData.password.length < 6) {
      addToast('Password must be at least 6 characters', 'error'); return;
    }
    setLoading(true);
    try {
      await register({ name: formData.name, email: formData.email, phone: formData.phone, password: formData.password });
      addToast('Registration successful! Please sign in.', 'success');
      navigate('/login');
    } catch (error) {
      addToast(error.response?.data?.message || 'Registration failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-[#0d0d0d] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#ff4700]/50 transition-colors placeholder-gray-600";

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff4700]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff4700]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/logo.png" alt="Al-Quresh Traders" className="h-20 w-auto object-contain mx-auto mb-4" />
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight mb-1">
            CREATE <span className="text-[#ff4700]">ACCOUNT</span>
          </h1>
          <p className="text-gray-500 text-sm">Join us and start shopping</p>
        </div>

        <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden">
          {/* Orange top bar */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#ff4700] to-transparent" />

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Muhammad Ahmed" className={inputClass} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" className={inputClass} />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="03XXXXXXXXX" className={inputClass} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Min. 6 characters" className={inputClass} />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Repeat password" className={inputClass} />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-white/10 bg-[#0d0d0d] accent-[#ff4700]" />
              <span className="text-gray-500 text-xs leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-[#ff4700] hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-[#ff4700] hover:underline">Privacy Policy</Link>
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff4700] hover:bg-[#e03e00] text-white font-black py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
            >
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Creating account...</>
              ) : (
                <><span>CREATE ACCOUNT</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative px-8 mb-6">
            <div className="absolute inset-0 flex items-center px-8"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center"><span className="px-4 bg-[#0f0f0f] text-gray-600 text-xs">OR</span></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-500 text-sm pb-8">
            Already have an account?{' '}
            <Link to="/login" className="text-[#ff4700] font-bold hover:underline">Sign in</Link>
          </p>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 text-xs hover:text-white transition-colors">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
