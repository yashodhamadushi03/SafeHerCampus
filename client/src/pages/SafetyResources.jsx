import React, { useState } from 'react';
import { 
  BookOpen, Shield, HelpCircle, HeartPulse, Sparkles, 
  MapPin, CheckCircle, ChevronRight, ShieldCheck, Video
} from 'lucide-react';

export default function SafetyResources() {
  const [activeTab, setActiveTab] = useState('tips');

  const tabs = [
    { id: 'tips', label: 'Safety Tips', icon: <Shield className="h-4 w-4" /> },
    { id: 'mental', label: 'Mental Health', icon: <HeartPulse className="h-4 w-4" /> },
    { id: 'defense', label: 'Self-Defense', icon: <Video className="h-4 w-4" /> },
    { id: 'policies', label: 'University Policies', icon: <BookOpen className="h-4 w-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Title */}
      <div className="text-left mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Safety & Support Resources</h1>
        <p className="text-gray-500 text-sm mt-1">Empower yourself with guidelines, self-defense procedures, and mental health counseling files.</p>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-purple-100 overflow-x-auto gap-2 mb-8 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3.5 px-5 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-purple-600 text-purple-700 font-bold bg-purple-50/30' 
                : 'border-transparent text-gray-500 hover:text-purple-600'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content rendering */}
      <div className="min-h-[400px]">
        {activeTab === 'tips' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Campus Walk Guidelines</h3>
              <div className="space-y-4">
                
                <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm flex items-start gap-4">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Stick to Designated Safe Paths</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">Walk along pathways with high lighting indices, green emergency pillars, and active surveillance cameras.</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm flex items-start gap-4">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Remove Distractions</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">Avoid looking down at screens or putting on noise-cancelling headphones while walking near dark parking spots or blocks.</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm flex items-start gap-4">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Walk in Groups</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">At night, always call a classmate, arrange a peer walking group, or call campus escorts at +1 (555) 911-SAFE.</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Commuter & Hostel Safety</h3>
              <div className="space-y-4">
                
                <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm flex items-start gap-4">
                  <div className="p-2 bg-pink-50 text-pink-500 rounded-xl shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Vehicle Pre-check</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">Before entering your vehicle in a parking lot, check the surrounding spaces and verify the backseat is unoccupied.</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm flex items-start gap-4">
                  <div className="p-2 bg-pink-50 text-pink-500 rounded-xl shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Dorm gate verification</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">Do not let strangers tailgate behind you into student residence blocks. Verify student credentials with wardens if necessary.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {activeTab === 'mental' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Counseling Services</h3>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
                  <h4 className="font-bold text-gray-900 text-base mb-2">Free Psychological Guidance</h4>
                  <p className="text-gray-600 text-xs leading-relaxed mb-4">
                    The University Student Health Center provides certified female therapists to help students manage stress, harassment trauma, anxiety, and exam pressures.
                  </p>
                  <div className="text-xs font-semibold text-purple-700 bg-purple-50 p-3 rounded-xl border border-purple-100">
                    📅 Hours: Mon - Fri (9 AM - 5 PM) • Office: Health Block, Rm 102
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
                  <h4 className="font-bold text-gray-900 text-base mb-2">24/7 Crisis Call & Text Lines</h4>
                  <p className="text-gray-600 text-xs leading-relaxed mb-4">
                    If you are dealing with trauma, distress, or panic outside center hours, dial or text these official services instantly.
                  </p>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li>💬 Crisis Text Hotline: Text <strong>'SAFE' to 741741</strong> (Free, Confidential)</li>
                    <li>📞 Support Circle Office: <strong>+1 (555) 333-TALK</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Peer Support Groups</h3>
              <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
                <h4 className="font-bold text-gray-900 text-base mb-2">SafeHer Student Alliance</h4>
                <p className="text-gray-600 text-xs leading-relaxed mb-4">
                  A weekly student-led peer community dedicated to sharing safety experiences, hosting self-defense practice, and advocating for improved campus lighting and security services.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-pink-600 mb-4 bg-pink-50 p-3 rounded-xl border border-pink-100">
                  <Sparkles className="h-4 w-4" /> Meetings: Every Wednesday, 5:30 PM - 7:00 PM (Student Lounge Block C)
                </div>
                <button className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl text-xs hover:bg-purple-700 transition-all cursor-pointer">
                  Join Support Group
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'defense' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Basic Self-Defense Techniques</h3>
              <div className="space-y-4">
                
                <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-900 text-sm">1. Strike Vulnerable Targets</h4>
                    <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">Critical</span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    If physically cornered, target the eyes, nose, throat, or groin with direct impact. A palm strike to the nose or fingers to the eyes causes immediate release.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                  <h4 className="font-bold text-gray-900 text-sm mb-2">2. Break a Wrist Grip</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    If someone grabs your wrist, do not pull back. Instead, turn your arm so your wrist points toward the attacker's thumb connection point, and yank your arm out with a quick snap.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                  <h4 className="font-bold text-gray-900 text-sm mb-2">3. Escape a Bear Hug from Behind</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Drop your weight quickly, push your hips forward to off-balance their core, and strike backward with your elbow to their face or headbutt their nose.
                  </p>
                </div>

              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Safety Gear Recommendations</h3>
              <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-4">
                <div className="flex items-start gap-3.5 pb-4 border-b border-purple-50">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-xl font-bold shrink-0 text-xs">01</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Personal Safety Alarm</h4>
                    <p className="text-gray-500 text-xs mt-1">A lightweight device that emits a 130dB siren and strobe light when the pin is pulled, disorienting attackers and notifying peers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pb-4 border-b border-purple-50">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-xl font-bold shrink-0 text-xs">02</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Tactical Keychains / Pens</h4>
                    <p className="text-gray-500 text-xs mt-1">Solid aluminum defense tools optimized to apply concentrated impact force to escape holds.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-xl font-bold shrink-0 text-xs">03</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Pepper Sprays</h4>
                    <p className="text-gray-500 text-xs mt-1">Non-lethal stream spray to secure a safe distance. Check university bylaws for campus guidelines on defensive sprays.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
            
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">Campus Code of Conduct</h4>
                <p className="text-gray-500 text-xs leading-relaxed">Outlines guidelines prohibiting sexual harassment, verbal abuse, stalking, and threat behaviors on campus properties.</p>
              </div>
              <button className="mt-6 text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group cursor-pointer">
                Read Policy Brief <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">Title IX Regulations</h4>
                <p className="text-gray-500 text-xs leading-relaxed">Federal/state protections guaranteeing educational equality, preventing gender-based discrimination, and detailing report requirements.</p>
              </div>
              <button className="mt-6 text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group cursor-pointer">
                Read Policy Brief <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">Hostel Guidelines</h4>
                <p className="text-gray-500 text-xs leading-relaxed">Security curfew updates, visitors policies, gate registration regulations, and resident emergency safety systems.</p>
              </div>
              <button className="mt-6 text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group cursor-pointer">
                Read Policy Brief <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
