import React, { useState, useEffect } from 'react';
import { incidentAPI } from '../services/api';
import { 
  AlertTriangle, EyeOff, Eye, MapPin, Calendar, Clipboard, 
  Loader2, CheckCircle2, ChevronRight, AlertCircle, ArrowUpRight
} from 'lucide-react';

export default function IncidentReport() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const categories = [
    { value: 'Harassment', label: 'Harassment' },
    { value: 'Theft', label: 'Theft' },
    { value: 'Suspicious Activity', label: 'Suspicious Activity' },
    { value: 'Poor Lighting', label: 'Poor Lighting' },
    { value: 'Medical Emergency', label: 'Medical Emergency' },
    { value: 'Other', label: 'Other' }
  ];

  const fetchUserReports = async () => {
    try {
      setLoading(true);
      const data = await incidentAPI.getIncidents(true); // user only
      setReports(data);
    } catch (err) {
      console.error('Error fetching reports:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess(false);

    if (!title || !description || !location || !category) {
      setFormError('Please fill in all required fields');
      return;
    }

    setSubmitLoading(true);
    try {
      await incidentAPI.createIncident({
        title,
        description,
        location,
        date,
        category,
        anonymous
      });

      // Clear Form
      setTitle('');
      setDescription('');
      setLocation('');
      setCategory('');
      setAnonymous(false);
      
      setFormSuccess(true);
      
      // Refresh list
      await fetchUserReports();
      
      // Clear success banner after 4 seconds
      setTimeout(() => setFormSuccess(false), 4000);
    } catch (err) {
      setFormError(err.message || 'Failed to submit report. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Helper to simulate status update
  const simulateStatusUpdate = async (reportId, currentStatus) => {
    let nextStatus = 'Reported';
    let adminNotes = '';
    
    if (currentStatus === 'Reported') {
      nextStatus = 'Under Investigation';
      adminNotes = 'Security patrol team is reviewing security camera recordings for this block.';
    } else if (currentStatus === 'Under Investigation') {
      nextStatus = 'Resolved';
      adminNotes = 'Issues resolved. Main gates and pathways have been checked and cleared.';
    } else {
      nextStatus = 'Reported';
      adminNotes = 'Report reopened by the user.';
    }

    try {
      await incidentAPI.updateIncidentStatus(reportId, nextStatus, adminNotes);
      await fetchUserReports(); // refresh lists
    } catch (err) {
      console.error('Failed to simulate status update:', err.message);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Reported': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Under Investigation': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="text-left mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Incident Reporting Center</h1>
        <p className="text-gray-500 text-sm mt-1">Submit campus hazards or incidents. Reports can be submitted anonymously.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report form (Spans 2 columns) */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clipboard className="h-5 w-5 text-purple-600" />
              Incident Details
            </h2>

            {formError && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-700 px-4 py-3.5 rounded-xl text-sm mb-6 animate-shake">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 text-emerald-800 px-4 py-3.5 rounded-xl text-sm mb-6 animate-fade-in">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>Report submitted successfully! Security dispatcher has been notified.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="title">
                  Incident Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="E.g., Broken lights in West Garden path"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-800"
                  disabled={submitLoading}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-800 appearance-none cursor-pointer"
                    disabled={submitLoading}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="location">
                    Location / Landmark
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <input
                      id="location"
                      type="text"
                      placeholder="E.g., Near Block D or Dorm Gate 3"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-800"
                      disabled={submitLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="date">
                    Date of Incident
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                      <Calendar className="h-5 w-5" />
                    </span>
                    <input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-800"
                      disabled={submitLoading}
                    />
                  </div>
                </div>

                {/* Anonymous Toggle card */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center justify-between border border-purple-100 p-4 rounded-xl bg-purple-50/20">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${anonymous ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'}`}>
                        {anonymous ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-gray-900">Report Anonymously</span>
                        <span className="block text-xs text-gray-500">Hide student profile details from logs</span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={anonymous} 
                        onChange={(e) => setAnonymous(e.target.checked)}
                        className="sr-only peer"
                        disabled={submitLoading}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="description">
                  Description of Incident
                </label>
                <textarea
                  id="description"
                  rows="4"
                  placeholder="Provide precise details of the occurrence, individuals involved, or hazard descriptions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-800"
                  disabled={submitLoading}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitLoading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {submitLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting Security Report...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5" />
                    Submit SafeHer Report
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* User's Reports sidebar listing */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Your Reports</h3>
          
          {loading ? (
            <div className="bg-white p-6 rounded-2xl border border-purple-500/10 flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : reports.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl border border-purple-100 text-center shadow-sm">
              <Clipboard className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No reports submitted yet.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {reports.map((rep) => (
                <div key={rep._id} className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm relative overflow-hidden group">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">{rep.category}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyle(rep.status)}`}>
                      {rep.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 leading-snug">{rep.title}</h4>
                  <p className="text-gray-500 text-xs line-clamp-2 mt-1.5 leading-relaxed">{rep.description}</p>
                  
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-3.5">
                    <MapPin className="h-3 w-3" />
                    <span>{rep.location}</span>
                  </div>

                  {rep.adminNotes && (
                    <div className="mt-3 bg-purple-50/50 p-2.5 rounded-lg border border-purple-100 text-[10px] text-purple-950">
                      <strong>Security:</strong> {rep.adminNotes}
                    </div>
                  )}

                  {/* Simulator action buttons to progress status */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] text-purple-600/60 font-semibold bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100/50">Test Tool</span>
                    <button 
                      onClick={() => simulateStatusUpdate(rep._id, rep.status)}
                      className="text-[10px] font-bold text-pink-600 hover:text-pink-700 flex items-center gap-0.5 cursor-pointer hover:underline"
                    >
                      Progress Status <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
