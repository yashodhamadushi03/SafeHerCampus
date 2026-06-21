import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ShieldAlert, PhoneCall, BookOpen, HeartHandshake, EyeOff, Bot, Sparkles } from 'lucide-react';

export default function Home({ user }) {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-200/40 blur-3xl pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-200/30 blur-3xl pointer-events-none -z-10"></div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-100/60 border border-purple-200/80 text-purple-800 text-sm font-semibold mb-6 animate-fade-in">
          <Sparkles className="h-4 w-4 text-pink-500 animate-spin" style={{ animationDuration: '4s' }} />
          Campus Safety Reinvented
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6 animate-slide-up">
          Empowering <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-800 bg-clip-text text-transparent">Women's Safety</span><br />
          on Campus
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          SafeHerCampus is a secure, digital safety net for female university students. Report incidents anonymously, get instant security dispatch, access support circles, and talk to our AI Safety Assistant anytime.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {user ? (
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-purple-200 hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center"
            >
              Go to Safety Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-purple-200 hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center"
              >
                Register Now
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white border-2 border-purple-200 hover:border-purple-300 text-purple-700 font-bold text-lg rounded-2xl hover:bg-purple-50/50 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-white/60 border-y border-purple-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-extrabold text-purple-700">24/7</p>
            <p className="text-gray-500 font-medium mt-1">Security Coverage</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-pink-500">100%</p>
            <p className="text-gray-500 font-medium mt-1">Anonymous Reporting</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-purple-700">&lt; 3 mins</p>
            <p className="text-gray-500 font-medium mt-1">Average Response Time</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-pink-500">Free</p>
            <p className="text-gray-500 font-medium mt-1">Student Services</p>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How We Keep You Safe</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Explore the tools and integrations engineered to safeguard you throughout your academic journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <EyeOff className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Anonymous Reporting</h3>
            <p className="text-gray-600 leading-relaxed">
              Report campus light outages, suspicious activities, or harassment securely. Turn on the anonymous toggle to remove your email/name from records.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
            <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 mb-6 group-hover:bg-pink-500 group-hover:text-white transition-all">
              <PhoneCall className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">SOS Quick Dial</h3>
            <p className="text-gray-600 leading-relaxed">
              One-click dials for Campus Security, Local Police, Medical center, or Women's support lines. Optimized for quick mobile execution during emergencies.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <Bot className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Safety Assistant</h3>
            <p className="text-gray-600 leading-relaxed">
              Get immediate, empathetic instructions on how to handle safety situations, access campus support networks, and request emergency walk escorts.
            </p>
          </div>
        </div>
      </section>

      {/* Support Circle Section */}
      <section className="bg-gradient-to-tr from-purple-900 via-indigo-950 to-pink-950 text-white py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex p-3 bg-purple-500/20 border border-purple-500/30 rounded-2xl mb-6">
            <HeartHandshake className="h-8 w-8 text-pink-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Together, We Create a Secure Campus</h2>
          <p className="text-purple-200 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Our collective reports shape a safer university environment. Empower yourself and your peers. Register today with your verified academic email to access all safety features.
          </p>
          {!user && (
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-lg transition-all hover:scale-105"
            >
              Get Started Free
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            <span className="font-bold text-gray-900">SafeHerCampus</span>
          </div>
          <p>&copy; {new Date().getFullYear()} SafeHerCampus. All rights reserved. Designed to support women on campus.</p>
        </div>
      </footer>
    </div>
  );
}
