import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { Shield, User, Mail, GraduationCap, Calendar, Lock, Loader2, AlertCircle } from 'lucide-react';

export default function Register({ onLoginSuccess }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [faculty, setFaculty] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Field Validations
    if (!fullName || !email || !faculty || !academicYear || !password || !confirmPassword) {
      setError('Please fill in all registration fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const data = await authAPI.register({
        fullName,
        email,
        faculty,
        academicYear,
        password
      });

      // Save Token
      localStorage.setItem('shc_token', data.token);

      // Save User State
      onLoginSuccess(data.user);

      // Navigate to Dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Try using another email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] rounded-full bg-purple-200/50 blur-3xl pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full bg-pink-200/40 blur-3xl pointer-events-none -z-10"></div>

      <div className="w-full max-w-lg bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-purple-100 shadow-xl animate-scale-in">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl text-white shadow-lg mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h2>
          <p className="text-gray-500 text-sm mt-2">Join SafeHerCampus to report incidents & access support</p>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-700 px-4 py-3.5 rounded-xl text-sm mb-6 animate-shake">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                  <User className="h-5 w-5" />
                </span>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-purple-100 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-800 text-sm"
                  disabled={loading}
                />
              </div>
            </div>

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
                  placeholder="jane.doe@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-purple-100 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-800 text-sm"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="faculty">
                Faculty / Department
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <select
                  id="faculty"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-purple-100 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-800 text-sm appearance-none cursor-pointer"
                  disabled={loading}
                >
                  <option value="">Select Faculty</option>
                  <option value="Faculty of Science">Faculty of Science</option>
                  <option value="Faculty of Engineering">Faculty of Engineering</option>
                  <option value="Faculty of Medicine">Faculty of Medicine</option>
                  <option value="Faculty of Arts & Humanities">Faculty of Arts & Humanities</option>
                  <option value="Faculty of Law">Faculty of Law</option>
                  <option value="Faculty of Business">Faculty of Business</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="academicYear">
                Academic Year
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                  <Calendar className="h-5 w-5" />
                </span>
                <select
                  id="academicYear"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-purple-100 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-800 text-sm appearance-none cursor-pointer"
                  disabled={loading}
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="w-full pl-11 pr-4 py-2.5 border border-purple-100 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-800 text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-purple-100 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-800 text-sm"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Registering...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-purple-100 text-center text-sm">
          <p className="text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-purple-600 hover:text-purple-700 underline transition-all">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
