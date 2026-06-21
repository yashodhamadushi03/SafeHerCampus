import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Menu, X, LayoutDashboard, AlertTriangle, Phone, BookOpen, MessageSquare, LogOut, User } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const activeClass = "bg-purple-100 text-purple-700 font-semibold px-3 py-2 rounded-lg flex items-center gap-2 transition-all";
  const inactiveClass = "text-gray-600 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-lg flex items-center gap-2 transition-all";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <div className="p-2 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl text-white shadow-md shadow-purple-200">
                <Shield className="h-6 w-6 animate-pulse-slow" />
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-700 via-pink-600 to-purple-800 bg-clip-text text-transparent">
                SafeHer<span className="font-light">Campus</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={isActive('/') ? activeClass : inactiveClass}>
              Home
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className={isActive('/dashboard') ? activeClass : inactiveClass}>
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link to="/report" className={isActive('/report') ? activeClass : inactiveClass}>
                  <AlertTriangle className="h-4 w-4" />
                  Report Incident
                </Link>
                <Link to="/contacts" className={isActive('/contacts') ? activeClass : inactiveClass}>
                  <Phone className="h-4 w-4" />
                  SOS Contacts
                </Link>
                <Link to="/resources" className={isActive('/resources') ? activeClass : inactiveClass}>
                  <BookOpen className="h-4 w-4" />
                  Resources
                </Link>
                <Link to="/ai-assistant" className={isActive('/ai-assistant') ? activeClass : inactiveClass}>
                  <MessageSquare className="h-4 w-4 text-pink-500" />
                  AI Assistant
                </Link>
                
                {/* User Info & Logout */}
                <div className="ml-4 pl-4 border-l border-gray-200 flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100">
                    <User className="h-4 w-4 text-purple-600" />
                    <span>{user.fullName.split(' ')[0]}</span>
                  </div>
                  <button 
                    onClick={handleLogoutClick}
                    className="flex items-center gap-1.5 text-sm font-semibold text-pink-600 hover:text-pink-700 hover:bg-pink-50 border border-pink-100 rounded-lg px-3 py-1.5 transition-all cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="ml-4 flex items-center gap-2">
                <Link 
                  to="/login" 
                  className="text-purple-600 hover:text-purple-700 font-semibold px-4 py-2 transition-all"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md shadow-purple-200 hover:shadow-lg transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-purple-100 animate-slide-up">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block ${isActive('/') ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-600'} px-3 py-2.5 rounded-lg flex items-center gap-2`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`block ${isActive('/dashboard') ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-600'} px-3 py-2.5 rounded-lg flex items-center gap-2`}
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5 text-purple-500" />
                  Dashboard
                </Link>
                <Link 
                  to="/report" 
                  className={`block ${isActive('/report') ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-600'} px-3 py-2.5 rounded-lg flex items-center gap-2`}
                  onClick={() => setIsOpen(false)}
                >
                  <AlertTriangle className="h-5 w-5 text-purple-500" />
                  Report Incident
                </Link>
                <Link 
                  to="/contacts" 
                  className={`block ${isActive('/contacts') ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-600'} px-3 py-2.5 rounded-lg flex items-center gap-2`}
                  onClick={() => setIsOpen(false)}
                >
                  <Phone className="h-5 w-5 text-purple-500" />
                  SOS Contacts
                </Link>
                <Link 
                  to="/resources" 
                  className={`block ${isActive('/resources') ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-600'} px-3 py-2.5 rounded-lg flex items-center gap-2`}
                  onClick={() => setIsOpen(false)}
                >
                  <BookOpen className="h-5 w-5 text-purple-500" />
                  Resources
                </Link>
                <Link 
                  to="/ai-assistant" 
                  className={`block ${isActive('/ai-assistant') ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-600'} px-3 py-2.5 rounded-lg flex items-center gap-2`}
                  onClick={() => setIsOpen(false)}
                >
                  <MessageSquare className="h-5 w-5 text-pink-500" />
                  AI Assistant
                </Link>
                
                {/* User Greeting & Logout */}
                <div className="pt-4 border-t border-purple-100 mt-2 px-3 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <User className="h-4 w-4 text-purple-600" />
                    <span>Logged in as <strong>{user.fullName}</strong></span>
                  </div>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center justify-center gap-2 text-pink-600 border border-pink-100 bg-pink-50 py-2.5 rounded-xl font-bold transition-all"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-4 border-t border-purple-100 mt-2 px-3 flex flex-col gap-2">
                <Link
                  to="/login"
                  className="w-full text-center text-purple-600 border border-purple-100 py-2.5 rounded-xl font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center text-white bg-gradient-to-r from-purple-600 to-pink-500 py-2.5 rounded-xl font-bold shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
