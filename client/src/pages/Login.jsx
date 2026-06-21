import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { Shield, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const data = await authAPI.login({ email, password });
      
      // Save token
      localStorage.setItem('shc_token', data.token);
      
      // Update app state
      onLoginSuccess(data.user);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-purple-200/50 blur-3xl pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-pink-200/40 blur-3xl pointer-events-none -z-10"></div>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-purple-100 shadow-xl animate-scale-in">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl text-white shadow-lg mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-2">Enter your credentials to access your safety dashboard</p>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-700 px-4 py-3.5 rounded-xl text-sm mb-6 animate-shake">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">
              University Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                <Mail className="h-5 w-5" />
              </span>
              <input
                id="email"
                type="email"
                placeholder="email@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-purple-100 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-800"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                <Lock className="h-5 w-5" />
              </span>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-purple-100 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-800"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-purple-100 text-center text-sm">
          <p className="text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-purple-600 hover:text-purple-700 underline transition-all">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
