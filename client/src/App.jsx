import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authAPI } from './services/api';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import IncidentReport from './pages/IncidentReport';
import EmergencyContacts from './pages/EmergencyContacts';
import SafetyResources from './pages/SafetyResources';
import AiAssistant from './pages/AiAssistant';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check user session on app mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('shc_token');
      if (token) {
        try {
          const userData = await authAPI.getMe();
          setUser(userData);
        } catch (err) {
          console.error('Session expired or invalid token:', err.message);
          localStorage.removeItem('shc_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('shc_token');
    setUser(null);
  };

  // Helper to secure paths
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfaff]">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfaff]">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#fcfaff]">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home user={user} />} />
            
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={setUser} />} 
            />
            
            <Route 
              path="/register" 
              element={user ? <Navigate to="/dashboard" replace /> : <Register onLoginSuccess={setUser} />} 
            />

            {/* Protected dashboard and features routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard user={user} />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/report" 
              element={
                <ProtectedRoute>
                  <IncidentReport />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/contacts" 
              element={
                <ProtectedRoute>
                  <EmergencyContacts />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/resources" 
              element={
                <ProtectedRoute>
                  <SafetyResources />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/ai-assistant" 
              element={
                <ProtectedRoute>
                  <AiAssistant />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
