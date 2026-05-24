import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading]   = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) =>
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      addToast('Please fill in all fields', 'error');
      return;
    }
    setLoading(true);
    try {
      await login(formData);
      addToast('Login successful!', 'success');
      navigate(from, { replace: true });
    } catch (error) {
      addToast(error.response?.data?.message || 'Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">

      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff4700]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#ff4700]/5 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <img src="/logo.png" alt="Al-Quresh Traders" className="h-20 w-auto object-contain mx-auto" />
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
            WELCOME <span className="text-[#ff4700]">BACK</span>
          </h1>
          <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
        </div>

        {/* Card */}
        <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">

          {/* Top accent */}
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#ff4700] to-transparent" />

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-gray-500 text-[11px] font-black uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#ff4700]/50 focus:ring-1 focus:ring-[#ff4700]/20 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-500 text-[11px] font-black uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#ff4700]/50 focus:ring-1 focus:ring-[#ff4700]/20 transition-colors"
                  />
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/10 bg-[#0d0d0d] accent-[#ff4700]"
                  />
                  <span className="text-gray-500 text-xs group-hover:text-gray-300 transition-colors">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-[#ff4700] text-xs hover:text-[#e03e00] transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#ff4700] hover:bg-[#e03e00] text-white font-black py-3.5 rounded-lg transition-colors text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>

            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-[#111] text-gray-600 text-xs">OR</span>
              </div>
            </div>

            {/* Register */}
            <p className="text-center text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#ff4700] font-bold hover:text-[#e03e00] transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-1.5 text-gray-600 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ff4700]" />
            Secure Login
          </div>
          <div className="w-px h-3 bg-white/10" />
          <div className="text-gray-600 text-[11px]">100% Safe & Encrypted</div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-4">
          <Link to="/" className="text-gray-600 text-xs hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;
