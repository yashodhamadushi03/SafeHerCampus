// Campus safety rule-based smart chatbot engine
const safetyKnowledgeBase = [
  {
    keywords: ['follow', 'stalk', 'chase', 'behind', 'stranger', 'scared', 'afraid'],
    response: "🚨 **Immediate Safety Action Plan:**\n\n1. **Do not go home directly.** Walk toward well-lit, crowded public areas (like the 24/7 Library, Student Union, or Security Main Post).\n2. **Call Campus Security IMMEDIATELY**: Dial **+1 (555) 911-SAFE** (or use the Emergency page's quick-call button).\n3. **Stay on the phone** with security or a trusted friend. If you feel in immediate danger, scream 'FIRE' or 'HELP' to attract attention.\n4. **Walk confidently** and look around you. Do not look down at your phone or wear headphones.",
    resources: ["Campus Security Guard Escort (+1-555-911-7233)", "SafeHer SOS Alarm (Available on Dashboard)"]
  },
  {
    keywords: ['emergency', 'danger', 'sos', 'call', 'help', 'phone', 'police', 'security'],
    response: "📞 **Emergency Dispatch Info:**\n\n- **Campus Security (Primary)**: +1 (555) 911-SAFE (Available 24/7 for security dispatch and campus escorts).\n- **Local Police Department**: 911 (for off-campus emergencies).\n- **Women's Emergency Help Desk**: +1 (555) 888-HELP (specialized support for female students).\n- **University Medical Clinic**: +1 (555) 222-WELL (8:00 AM - 8:00 PM).",
    resources: ["Emergency Contacts Page (clickable dials)", "SafeHer SOS Hotline"]
  },
  {
    keywords: ['dark', 'light', 'flicker', 'broken', 'path', 'night', 'walk', 'escort'],
    response: "🔦 **Walking at Night & Lighting Reports:**\n\n- **Security Companion Escort**: If you must walk across campus after dark, call Security at **+1 (555) 911-SAFE** to request a physical escort to your hostel or car. It is a free service!\n- **Report Poor Lighting**: You can report broken lights via our **Incident Reporting Page** (select category 'Poor Lighting'). SafeHer Campus compiles these reports to pressure administration to repair them.\n- **Tip**: Keep a small flashlight in your purse, stick to the designated 'Safe Pathways' map, and walk with peer groups when possible.",
    resources: ["Companion Escort Service", "Incident Reporting Page"]
  },
  {
    keywords: ['harass', 'catcall', 'abuse', 'bully', 'touch', 'assault', 'threat'],
    response: "💜 **We stand with you. Please know that this is NOT your fault.**\n\n- **Anonymous Reporting**: You can file a formal incident report on our platform anonymously. Your name, email, and ID will be completely hidden from the public and security files.\n- **Support Resources**:\n  1. **Counseling Center**: Talk to an empathetic counselor at **+1 (555) 333-TALK**.\n  2. **Women's Support Network**: Weekly peer groups at the Student Center, Room 402.\n  3. **Legal Aid Desk**: Free legal guidance on campus safety policies (Title IX and Local Penal Codes).",
    resources: ["University Counseling Center", "Women's Help Desk", "Incident Reporting (Anonymous)"]
  },
  {
    keywords: ['depressed', 'anxious', 'stress', 'mental', 'counsel', 'sad', 'cry', 'lonely', 'scared', 'exam', 'pressure'],
    response: "🌱 **Your mental well-being is vital. You don't have to carry this alone.**\n\n- **Campus Counseling Center**: Offers free, confidential individual counseling sessions. Dial **+1 (555) 333-TALK** (Mon-Fri, 9 AM - 5 PM).\n- **24/7 Mental Health Crisis Line**: Text 'SAFE' to 741741 to connect with a crisis counselor immediately.\n- **SafeHer Community**: Reach out to peer student support groups at the Student Union. They host wellness circles every Wednesday.",
    resources: ["University Counseling Center", "Crisis Text Line (741741)", "Wellness Peer Circle"]
  },
  {
    keywords: ['report', 'incident', 'file', 'anonymous', 'status'],
    response: "📝 **How to file a report on SafeHerCampus:**\n\n1. Go to the **Incident Reporting Page** from your Dashboard.\n2. Fill out the title, location, category, date, and description.\n3. Turn on the **Anonymous Reporting** toggle if you wish to keep your identity confidential.\n4. Click **Submit Report**. You can track the investigation and resolution progress on your Dashboard under 'My Reports'.",
    resources: ["Incident Reporting Form", "Dashboard (Track Reports)"]
  }
];

// AI Chat endpoint
exports.chat = async (req, res) => {
  const { message } = req.body;

  try {
    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Message content cannot be empty' });
    }

    const query = message.toLowerCase();
    let matchedResponse = null;

    // Search for keywords
    for (const item of safetyKnowledgeBase) {
      const match = item.keywords.some(keyword => query.includes(keyword));
      if (match) {
        matchedResponse = item;
        break;
      }
    }

    // Default fallback response
    if (!matchedResponse) {
      matchedResponse = {
        response: "Hello! I am your **SafeHer Campus Safety Assistant**. 🛡️\n\nI can help you navigate campus safely, find security contacts, report incidents, or access mental health services.\n\n*Try asking me:*\n- *'I am being followed, what should I do?'*\n- *'Who do I call in an emergency?'*\n- *'How do I report broken lights?'*\n- *'Where can I find mental health counseling?'*",
        resources: ["Emergency Contacts Page", "Safety Resources Library"]
      };
    }

    // Simulate small network delay for a professional feel
    setTimeout(() => {
      return res.json({
        reply: matchedResponse.response,
        resources: matchedResponse.resources,
        timestamp: new Date()
      });
    }, 400);

  } catch (err) {
    console.error('AI Chat Error:', err.message);
    res.status(500).json({ message: 'Server error in AI Safety Assistant' });
  }
};
