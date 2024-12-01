import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiBriefcase, FiArrowRight } from 'react-icons/fi';
import { login } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { setAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await login(email, password);
        setAuth(true, { email, company: response.userData.company });
      } else {
        setAuth(true, { email, company });
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-indigo-50 to-pink-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl bg-white/70 backdrop-blur-sm p-12 rounded-2xl shadow-xl"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-4">
              {isLogin ? 'Welcome back!' : 'Create account'}
            </h1>
            <p className="text-lg text-indigo-600">
              {isLogin ? 'Sign in to continue to SocialHub' : 'Get started with SocialHub'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-3">
                  Company Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl blur group-hover:blur-md transition-all"></div>
                  <div className="relative bg-white rounded-xl">
                    <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg"
                      placeholder="Enter your company name"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-indigo-900 mb-3">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl blur group-hover:blur-md transition-all"></div>
                <div className="relative bg-white rounded-xl">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-900 mb-3">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl blur group-hover:blur-md transition-all"></div>
                <div className="relative bg-white rounded-xl">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-pink-50 border border-pink-200 rounded-xl text-pink-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center space-x-3 text-lg font-medium shadow-xl shadow-indigo-500/25"
            >
              <span>{loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}</span>
              <FiArrowRight className="w-5 h-5" />
            </button>

            <p className="text-center text-indigo-600 text-lg">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium hover:text-indigo-700 underline decoration-2 decoration-indigo-500/30 hover:decoration-indigo-500 underline-offset-4 transition-all"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </form>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-600 to-pink-500 items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 max-w-lg text-white"
        >
          <h2 className="text-4xl font-bold mb-6">
            Transform Your Social Media Presence
          </h2>
          <p className="text-xl mb-10 text-white/90 leading-relaxed">
            Create, schedule, and manage your social media content with ease. Join thousands of businesses using SocialHub to grow their online presence.
          </p>
          <div className="flex items-center space-x-6">
            <div className="flex -space-x-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64"
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
                alt="User"
              />
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=64&h=64"
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
                alt="User"
              />
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64"
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
                alt="User"
              />
              <div className="w-12 h-12 rounded-full border-2 border-white bg-white/20 flex items-center justify-center text-sm font-medium">
                +5k
              </div>
            </div>
            <p className="text-white/90 text-lg">Join our growing community</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};