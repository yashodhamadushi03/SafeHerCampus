import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { incidentAPI } from '../services/api';
import { 
  User, AlertTriangle, Phone, BookOpen, MessageSquare, ShieldCheck, 
  Clock, AlertCircle, CheckCircle, ChevronRight, BarChart2, Lightbulb, Bell, MapPin
} from 'lucide-react';

export default function Dashboard({ user }) {
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(3);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    "📢 Campus Escort Service is active. Call +1 (555) 911-SAFE to walk safely after 6:00 PM.",
    "🔦 Pathway lights near Science Building Block C have been replaced following student reports.",
    "💡 Self-Defense seminar this Friday at 4:00 PM in the Gym. Free entry for all students.",
    "📱 Keep your location services active when using the companion escort app option."
  ];

  useEffect(() => {
    let interval;
    if (announcements.length > 0) {
      interval = setInterval(() => {
        setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, []);

  // Fetch Dashboard Stats and User Incidents
  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsData, incidentsData] = await Promise.all([
        incidentAPI.getStats(),
        incidentAPI.getIncidents(true) // Get only this user's reports
      ]);
      setStats(statsData);
      setReports(incidentsData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // SOS Countdown handler
  useEffect(() => {
    let timer;
    if (sosActive && sosCountdown > 0) {
      timer = setTimeout(() => {
        setSosCountdown(prev => prev - 1);
      }, 1000);
    } else if (sosActive && sosCountdown === 0) {
      setSosTriggered(true);
      setSosActive(false);
    }
    return () => clearTimeout(timer);
  }, [sosActive, sosCountdown]);

  const triggerSos = () => {
    setSosActive(true);
    setSosCountdown(3);
    setSosTriggered(false);
  };

  const cancelSos = () => {
    setSosActive(false);
    setSosCountdown(3);
  };

  const dismissSosAlert = () => {
    setSosTriggered(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Reported': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Under Investigation': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Resolved': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Reported': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Under Investigation': return <AlertCircle className="h-4 w-4 text-amber-600 animate-pulse" />;
      case 'Resolved': return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* SOS Countdown Overlay */}
      {sosActive && (
        <div className="fixed inset-0 bg-red-950/80 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white px-4">
          <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-5xl font-black mb-6 animate-ping absolute"></div>
          <div className="w-24 h-24 bg-red-700 rounded-full flex items-center justify-center text-5xl font-black mb-6 relative shadow-2xl">
            {sosCountdown}
          </div>
          <h2 className="text-3xl font-extrabold text-center mb-2">TRIGGERING SOS DISPATCH</h2>
          <p className="text-red-200 text-center max-w-sm mb-8 text-sm">
            GPS location and user profile are being sent to Campus Security in {sosCountdown} seconds.
          </p>
          <button 
            onClick={cancelSos} 
            className="px-8 py-3.5 bg-white text-red-700 font-bold rounded-xl shadow-lg hover:bg-red-50 hover:scale-105 transition-all cursor-pointer"
          >
            Cancel Dispatch
          </button>
        </div>
      )}

      {/* SOS Alert Confirmed */}
      {sosTriggered && (
        <div className="mb-6 bg-red-600 border border-red-700 text-white p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg animate-bounce">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Phone className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-extrabold text-lg">SOS DISPATCH SENT SUCCESSFULLY!</h4>
              <p className="text-red-100 text-sm">Campus Security has received your emergency request. Officers are heading to your location.</p>
            </div>
          </div>
          <button 
            onClick={dismissSosAlert} 
            className="px-4 py-2 bg-white text-red-700 text-sm font-bold rounded-lg hover:bg-red-50 transition-all cursor-pointer shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Welcome & User snapshot */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[30vw] h-[30vw] rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
          <div>
            <span className="text-purple-300 text-sm font-semibold tracking-wider uppercase">Welcome back</span>
            <h2 className="text-3xl font-extrabold mt-1">Hello, {user.fullName}!</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-purple-200">
              <span className="flex items-center gap-1"><User className="h-4 w-4" /> {user.faculty}</span>
              <span className="w-1.5 h-1.5 bg-pink-400 rounded-full self-center"></span>
              <span>{user.academicYear}</span>
            </div>
          </div>
          
          <button 
            onClick={triggerSos}
            className="px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-extrabold rounded-2xl shadow-lg shadow-red-500/20 hover:scale-105 transition-all cursor-pointer flex items-center gap-2 border border-red-400"
          >
            <Phone className="h-5 w-5 animate-pulse" />
            TRIGGER EMERGENCY SOS
          </button>
        </div>
      </div>

      {/* Safety Awareness Notification Banner */}
      <div className="bg-purple-50 border border-purple-100 text-purple-900 rounded-2xl p-4 mb-8 flex items-center gap-3 shadow-sm">
        <Bell className="h-5 w-5 text-purple-600 shrink-0 animate-bounce" />
        <p className="text-sm font-semibold transition-all duration-500">{announcements[announcementIndex]}</p>
      </div>

      {/* Grid of Quick Actions & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Quick Actions Grid (Spans 2 columns on large screens) */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Safety Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Action 1 */}
              <Link 
                to="/report" 
                className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-start gap-4 group"
              >
                <div className="p-3 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition-all flex items-center gap-1">
                    Report Incident <ChevronRight className="h-4 w-4" />
                  </h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">File a secure, anonymous report for lighting issues, hazards, or harassment.</p>
                </div>
              </Link>

              {/* Action 2 */}
              <Link 
                to="/contacts" 
                className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-start gap-4 group"
              >
                <div className="p-3 bg-pink-50 rounded-xl text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-pink-600 transition-all flex items-center gap-1">
                    Emergency Contacts <ChevronRight className="h-4 w-4" />
                  </h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">Access quick dials for security guards, medical clinic, and counseling desk.</p>
                </div>
              </Link>

              {/* Action 3 */}
              <Link 
                to="/resources" 
                className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-start gap-4 group"
              >
                <div className="p-3 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition-all flex items-center gap-1">
                    Safety Resources <ChevronRight className="h-4 w-4" />
                  </h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">Browse legal guidelines, mental health assistance, self-defense tutorials.</p>
                </div>
              </Link>

              {/* Action 4 */}
              <Link 
                to="/ai-assistant" 
                className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-start gap-4 group"
              >
                <div className="p-3 bg-pink-50 rounded-xl text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-pink-600 transition-all flex items-center gap-1">
                    AI Safety Assistant <ChevronRight className="h-4 w-4" />
                  </h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">Get conversational guides, security advice, and peer groups information.</p>
                </div>
              </Link>

            </div>
          </div>

          {/* User's Reports Status Timeline */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Recent Reports</h3>
            {loading ? (
              <div className="bg-white p-6 rounded-2xl border border-purple-500/10 flex items-center justify-center py-10">
                <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : reports.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-purple-100 text-center shadow-sm">
                <ShieldCheck className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900">All Clear!</h4>
                <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">You haven't filed any safety incident reports yet. Any reports you submit will appear here with live tracking.</p>
                <Link to="/report" className="inline-block mt-4 text-sm font-bold text-purple-600 hover:text-purple-700">
                  File your first report &rarr;
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden divide-y divide-purple-50">
                {reports.slice(0, 3).map((rep) => (
                  <div key={rep._id} className="p-5 hover:bg-purple-50/20 transition-all">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                      <h4 className="font-bold text-gray-900">{rep.title}</h4>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(rep.status)}`}>
                        {getStatusIcon(rep.status)}
                        {rep.status}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{rep.description}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {rep.location}</span>
                      <span>•</span>
                      <span>Category: <strong>{rep.category}</strong></span>
                      <span>•</span>
                      <span>{new Date(rep.date).toLocaleDateString()}</span>
                    </div>
                    {rep.adminNotes && (
                      <div className="mt-3.5 bg-purple-50/70 border border-purple-100 p-3 rounded-xl text-xs text-purple-900 leading-relaxed">
                        <strong>Security Update:</strong> {rep.adminNotes}
                      </div>
                    )}
                  </div>
                ))}
                {reports.length > 3 && (
                  <div className="p-3 text-center bg-gray-50">
                    <Link to="/report" className="text-xs font-bold text-purple-600 hover:text-purple-700">
                      View all {reports.length} reports
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Safety Analytics Column */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Campus Safety Index</h3>
          
          {loading ? (
            <div className="bg-white p-6 rounded-2xl border border-purple-500/10 flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : stats ? (
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm text-center">
              
              {/* Radial Index Metric */}
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center mb-4">
                {/* Circular track */}
                <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-purple-600 transition-all duration-1000"
                    strokeDasharray={`${stats.safetyScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="text-center">
                  <span className="text-4xl font-extrabold text-gray-900">{stats.safetyScore}%</span>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Safety Rating</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto mb-6">
                Calculated from unresolved reports, response speeds, and lighting alerts across active campus blocks.
              </p>

              {/* Status Breakdowns */}
              <div className="grid grid-cols-3 gap-2 border-t border-purple-50 pt-5 mb-6 text-center">
                <div>
                  <span className="block text-xl font-extrabold text-purple-700">{stats.totalReports}</span>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase">Total Filed</span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-amber-500">{stats.statusCounts.investigating}</span>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase">Active Cases</span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-emerald-600">{stats.statusCounts.resolved}</span>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase">Resolved</span>
                </div>
              </div>

              {/* Custom Graph of Incidents by Category */}
              <div className="space-y-3.5 text-left">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Reports by Category</span>
                
                {Object.keys(stats.categoryCounts).map((cat) => {
                  const count = stats.categoryCounts[cat];
                  const percent = stats.totalReports > 0 ? (count / stats.totalReports) * 100 : 0;
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-gray-700">
                        <span>{cat}</span>
                        <span className="text-gray-400">{count}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Safety tips box */}
              <div className="mt-6 bg-purple-50 rounded-2xl p-4 text-left flex gap-3 border border-purple-100/50">
                <Lightbulb className="h-5 w-5 text-purple-600 shrink-0" />
                <div className="text-xs">
                  <strong className="text-purple-950 font-bold block mb-0.5">Quick Safety Tip</strong>
                  <p className="text-purple-900/80 leading-relaxed">Save the Campus Security dispatcher number to your speed dials. Report any flickering lights promptly.</p>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-purple-100 text-center">
              <BarChart2 className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Failed to load statistics.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
