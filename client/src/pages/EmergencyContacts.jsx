import React, { useState } from 'react';
import { 
  Phone, Search, Shield, ShieldAlert, HeartPulse, UserPlus, 
  HelpCircle, ExternalLink, X, Radio, PhoneOff
} from 'lucide-react';

export default function EmergencyContacts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCall, setActiveCall] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [callTimerInterval, setCallTimerInterval] = useState(null);

  const contactList = [
    {
      id: 'sec_dispatch',
      name: 'Campus Security Main Dispatch',
      number: '+1 (555) 911-SAFE',
      subnumber: '+1 (555) 911-7233',
      category: 'Security',
      description: 'Primary 24/7 security dispatch for patrols, companion escorts, and emergencies.',
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      availability: '24/7 Dispatch'
    },
    {
      id: 'local_police',
      name: 'Local Police Department',
      number: '911',
      subnumber: '+1 (555) 911-0000',
      category: 'Security',
      description: 'Off-campus emergency response and official criminal complaint registrations.',
      icon: <ShieldAlert className="h-6 w-6 text-red-600" />,
      availability: '24/7 Response'
    },
    {
      id: 'womens_help',
      name: "Women's Emergency Help Desk",
      number: '+1 (555) 888-HELP',
      subnumber: '+1 (555) 888-4357',
      category: 'Support',
      description: 'Specialized counseling and direct intervention lines for female students.',
      icon: <UserPlus className="h-6 w-6 text-pink-500" />,
      availability: '24/7 Hotline'
    },
    {
      id: 'medical_center',
      name: 'University Medical Clinic',
      number: '+1 (555) 222-WELL',
      subnumber: '+1 (555) 222-9355',
      category: 'Medical',
      description: 'First aid, nurse practitioners, sexual health services, and ambulance coordination.',
      icon: <HeartPulse className="h-6 w-6 text-emerald-600" />,
      availability: 'Mon - Fri, 8AM - 8PM'
    },
    {
      id: 'counseling_center',
      name: 'Student Counseling Center',
      number: '+1 (555) 333-TALK',
      subnumber: '+1 (555) 333-8255',
      category: 'Counseling',
      description: 'Confidential crisis counseling, anxiety management sessions, and psychological support.',
      icon: <HelpCircle className="h-6 w-6 text-blue-600" />,
      availability: 'Mon - Fri, 9AM - 5PM'
    }
  ];

  const handleCallStart = (contact) => {
    setActiveCall(contact);
    setCallDuration(0);
    
    // Setup interval to simulate calling duration increment
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    
    setCallTimerInterval(interval);
  };

  const handleCallEnd = () => {
    if (callTimerInterval) {
      clearInterval(callTimerInterval);
    }
    setActiveCall(null);
    setCallDuration(0);
  };

  const formatDuration = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Filter contacts by search query
  const filteredContacts = contactList.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Dialer Call Simulator Popup */}
      {activeCall && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-lg z-50 flex items-center justify-center text-white px-4">
          <div className="w-full max-w-sm bg-slate-800 rounded-3xl p-8 text-center border border-slate-700 shadow-2xl relative">
            <div className="absolute top-4 right-4 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
              <Radio className="h-3 w-3" />
              Simulating Call
            </div>
            
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mt-6 mb-8 text-white animate-pulse">
              <Phone className="h-10 w-10" />
            </div>

            <h3 className="text-xl font-bold mb-1.5">{activeCall.name}</h3>
            <p className="text-purple-400 font-mono text-lg mb-6">{activeCall.number}</p>
            
            <div className="text-slate-400 text-sm font-semibold tracking-widest mb-10">
              {callDuration === 0 ? 'DIALING...' : `ACTIVE • ${formatDuration(callDuration)}`}
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mb-10 text-slate-400 text-xs font-medium">
              <div className="bg-slate-700/50 p-3 rounded-2xl hover:bg-slate-700 transition-all cursor-pointer">Keypad</div>
              <div className="bg-slate-700/50 p-3 rounded-2xl hover:bg-slate-700 transition-all cursor-pointer">Mute</div>
              <div className="bg-slate-700/50 p-3 rounded-2xl hover:bg-slate-700 transition-all cursor-pointer">Speaker</div>
            </div>

            <button 
              onClick={handleCallEnd}
              className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all mx-auto shadow-lg hover:scale-105 cursor-pointer"
            >
              <PhoneOff className="h-7 w-7 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Main Page Layout */}
      <div className="text-left mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">SOS Contacts Directory</h1>
        <p className="text-gray-500 text-sm mt-1">Get immediate assistance. Type contacts in search, or click call to contact campus responders.</p>
      </div>

      {/* Search and Categories bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
            <Search className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Search security dispatcher, medical center..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-purple-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400 bg-white shadow-sm text-gray-800 text-sm"
          />
        </div>
        
        {/* Simple count summary */}
        <div className="text-sm font-semibold text-purple-700 bg-purple-50 border border-purple-100 px-4 py-2 rounded-xl self-end md:self-center shrink-0">
          Showing {filteredContacts.length} emergency contacts
        </div>
      </div>

      {/* Contacts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center border border-purple-100 rounded-3xl shadow-sm">
            <Search className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No contacts match your search query.</p>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div 
              key={contact.id}
              className="bg-white rounded-3xl border border-purple-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                    {contact.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 bg-gray-100 rounded-full text-gray-500 uppercase border">
                    {contact.availability}
                  </span>
                </div>

                <h3 className="font-extrabold text-gray-900 text-lg mb-1 leading-snug">{contact.name}</h3>
                <span className="text-xs font-semibold text-purple-600/70 block mb-3 uppercase tracking-wider">{contact.category}</span>
                <p className="text-gray-600 text-xs leading-relaxed mb-6">{contact.description}</p>
              </div>

              <div className="pt-4 border-t border-purple-50 flex items-center gap-3">
                <button
                  onClick={() => handleCallStart(contact)}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold rounded-xl shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all text-sm"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </button>
                <a 
                  href={`tel:${contact.subnumber}`}
                  className="p-3 border border-purple-100 rounded-xl hover:bg-purple-50 text-purple-600 transition-all cursor-pointer"
                  title="Direct Dial"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
