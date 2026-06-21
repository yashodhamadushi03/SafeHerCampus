import React, { useState, useRef, useEffect } from 'react';
import { aiAPI } from '../services/api';
import { 
  MessageSquare, Send, Bot, User, Sparkles, Loader2, 
  ArrowRightCircle, HelpCircle, PhoneCall, ShieldAlert, HeartHandshake
} from 'lucide-react';

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I am your **SafeHer Campus Safety Assistant** 🛡️. I'm here to help you navigate campus safely, access support networks, or report emergency issues.\n\n*Try asking me one of the quick suggestions below or write your own message!*",
      resources: [],
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "I am being followed, what should I do?",
    "Who do I call in an emergency?",
    "How do I report broken lights?",
    "Where is the counseling center?"
  ];

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Clear input
    if (!textToSend) {
      setInputText('');
    }

    // Add User Message
    const userMsgId = 'msg_' + Date.now();
    const newUserMessage = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);
    
    setLoading(true);
    try {
      const response = await aiAPI.chatWithAi(query);
      
      // Add AI Response
      const aiMsgId = 'ai_' + Date.now();
      const newAiMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: response.reply,
        resources: response.resources || [],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
    } catch (err) {
      const errorMsgId = 'err_' + Date.now();
      setMessages(prev => [...prev, {
        id: errorMsgId,
        sender: 'ai',
        text: "⚠️ **Connection Error:** I was unable to connect to the campus safety service. Please try again. If this is an immediate emergency, please dial **+1 (555) 911-SAFE**.",
        resources: ["Emergency Contacts Page"],
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPromptClick = (prompt) => {
    if (loading) return;
    handleSend(prompt);
  };

  // Helper to render markdown-like styles in text (bold, list items, numbers)
  const formatMessageText = (text) => {
    return text.split('\n').map((line, idx) => {
      // Bold bullet highlights
      let formattedLine = line;
      
      // Check for bold highlights **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        // Text before bold
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        // Bold text
        parts.push(<strong key={match.index} className="font-extrabold text-slate-900">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const lineContent = parts.length > 0 ? parts : line;

      // Render bullet list
      if (line.trim().startsWith('-')) {
        return (
          <li key={idx} className="ml-4 list-disc text-sm text-gray-700 mt-1 pl-1 leading-relaxed">
            {typeof lineContent === 'string' ? line.substring(1).trim() : lineContent}
          </li>
        );
      }
      // Render numbered list
      if (/^\d+\./.test(line.trim())) {
        const match = line.trim().match(/^(\d+\.)(.*)/);
        return (
          <div key={idx} className="ml-4 flex gap-1 text-sm text-gray-700 mt-1 pl-1 leading-relaxed">
            <span className="font-bold shrink-0">{match[1]}</span>
            <span>{match[2].trim()}</span>
          </div>
        );
      }
      // Render header alerts
      if (line.trim().startsWith('🚨') || line.trim().startsWith('📞') || line.trim().startsWith('🔦') || line.trim().startsWith('🌱') || line.trim().startsWith('💜') || line.trim().startsWith('📝')) {
        return (
          <p key={idx} className="font-bold text-sm text-purple-950 mt-3 mb-1.5 flex items-center gap-1.5 leading-snug">
            {lineContent}
          </p>
        );
      }

      // Standard paragraph line
      return line.trim() === '' ? <div key={idx} className="h-2"></div> : <p key={idx} className="text-sm text-gray-700 leading-relaxed mt-1">{lineContent}</p>;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in h-[calc(100vh-6rem)] flex flex-col">
      <div className="text-left mb-6 shrink-0">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">AI Safety Assistant</h1>
        <p className="text-gray-500 text-sm mt-1">Get immediate guides, safety protocols, and mental health counseling references.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-4 gap-8 mb-4">
        
        {/* Chat History Panel (Spans 3 columns) */}
        <div className="lg:col-span-3 bg-white border border-purple-100 rounded-3xl shadow-sm flex flex-col overflow-hidden">
          
          {/* Active AI Header Status */}
          <div className="px-6 py-4 border-b border-purple-50 flex items-center justify-between bg-purple-50/20 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-gray-900">SafeHer Companion AI</h3>
                <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1.5 uppercase">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  Online & Active
                </span>
              </div>
            </div>
            
            <span className="text-xs text-purple-600/70 font-semibold bg-purple-100/60 px-3 py-1.5 rounded-xl border border-purple-200/50 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-pink-500" />
              Empathetic Guidance
            </span>
          </div>

          {/* Messages Stream Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* AI Avatar */}
                {msg.sender === 'ai' && (
                  <div className="w-9 h-9 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="h-4.5 w-4.5" />
                  </div>
                )}

                {/* Message bubble */}
                <div className={`max-w-[85%] sm:max-w-[70%] p-4 rounded-3xl ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-tr from-purple-600 to-pink-500 text-white rounded-tr-sm shadow-md'
                    : 'bg-slate-100 text-gray-800 rounded-tl-sm border border-slate-200/40'
                }`}>
                  <div className="space-y-1">
                    {msg.sender === 'user' ? (
                      <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                    ) : (
                      formatMessageText(msg.text)
                    )}
                  </div>

                  {/* AI Resource Tags */}
                  {msg.sender === 'ai' && msg.resources && msg.resources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200/50 space-y-2">
                      <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">Recommended Safety Resources:</span>
                      <div className="flex flex-wrap gap-2">
                        {msg.resources.map((res, i) => (
                          <div key={i} className="text-xs bg-purple-50 text-purple-800 px-3 py-1 rounded-full border border-purple-100/80 font-medium">
                            {res}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timestamp label */}
                  <span className={`block text-[9px] mt-2 text-right ${msg.sender === 'user' ? 'text-purple-100' : 'text-gray-400'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* User Avatar */}
                {msg.sender === 'user' && (
                  <div className="w-9 h-9 bg-purple-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <User className="h-4.5 w-4.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Simulated typing loading bubble */}
            {loading && (
              <div className="flex gap-4 justify-start">
                <div className="w-9 h-9 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                  <Bot className="h-4.5 w-4.5" />
                </div>
                <div className="bg-slate-100 text-gray-800 p-4 rounded-3xl rounded-tl-sm border border-slate-200/40 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts & Form Inputs */}
          <div className="p-4 border-t border-purple-50 shrink-0">
            {/* Quick Prompts Chips */}
            <div className="flex flex-wrap gap-2 mb-3.5">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPromptClick(prompt)}
                  disabled={loading}
                  className="text-xs bg-purple-50/70 border border-purple-100 text-purple-700 px-3.5 py-1.5 rounded-full hover:bg-purple-100 hover:text-purple-900 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Standard Text Box Form */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                placeholder="Ask about escort services, report safety issues, panic support..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-3 border border-purple-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-800 text-sm bg-gray-50/50"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !inputText.trim()}
                className="p-3 bg-gradient-to-tr from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>

        </div>

        {/* Sidebar Help Card (Desktop Only - 1 Column) */}
        <div className="hidden lg:block space-y-6">
          
          <div className="bg-gradient-to-b from-purple-900 to-indigo-950 rounded-3xl p-5 text-white border border-purple-800 shadow-md">
            <h4 className="font-extrabold text-sm mb-3.5 flex items-center gap-1.5">
              <ShieldAlert className="h-4.5 w-4.5 text-pink-400" />
              Emergency Quick Support
            </h4>
            <p className="text-purple-200 text-[11px] leading-relaxed mb-6">
              If you feel insecure walking across campus or are facing harassment, initiate emergency alerts instantly.
            </p>
            <div className="space-y-3">
              <a 
                href="tel:+15559117233"
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <PhoneCall className="h-4 w-4" />
                Security Dispatch
              </a>
              <a 
                href="tel:+15558884357"
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <HeartHandshake className="h-4 w-4" />
                Women's Help Desk
              </a>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-sm">
            <h4 className="font-bold text-gray-900 text-sm mb-3.5 flex items-center gap-1.5">
              <HelpCircle className="h-4.5 w-4.5 text-purple-600" />
              How the Assistant Works
            </h4>
            <p className="text-gray-500 text-[11px] leading-relaxed">
              SafeHer Companion checks for security codes, counselor numbers, lighting repairs, and defense checksheets to guide students immediately.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
