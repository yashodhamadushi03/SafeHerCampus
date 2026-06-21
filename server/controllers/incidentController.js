const Incident = require('../models/Incident');
const { getIsConnected } = require('../config/db');
const { getMockUsers } = require('./authController');

// Initial mock data to provide an attractive dashboard right away
const mockIncidents = [
  {
    _id: 'mock_inc_1',
    title: 'Flickering street lights near Science Building block C',
    description: 'The street lights have been completely broken for 3 days, making the pathway dark and unsafe around 7-9 PM.',
    location: 'Path behind Science Block C',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    category: 'Poor Lighting',
    anonymous: true,
    reportedBy: null,
    status: 'Under Investigation',
    adminNotes: 'Campus maintenance team has been notified. Bulbs will be replaced by Monday.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    _id: 'mock_inc_2',
    title: 'Suspicious individual tailgating at Hostel Gate 2',
    description: 'A male person without student ID was seen waiting outside the gate and trying to enter by following students in.',
    location: 'Female Hostel Gate 2',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    category: 'Suspicious Activity',
    anonymous: false,
    reportedBy: 'mock_user_demo', // placeholder, will link if registered
    status: 'Reported',
    adminNotes: 'Security patrol route has been updated to include Gate 2 hourly checks.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    _id: 'mock_inc_3',
    title: 'Harassment incident report near Gym area',
    description: 'Received catcalling and verbal harassment while walking near the outdoor gym equipment around 6:30 PM.',
    location: 'Campus Gym Pathway',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    category: 'Harassment',
    anonymous: true,
    reportedBy: null,
    status: 'Resolved',
    adminNotes: 'Security reviewed CCTV footage, identified the outsider, and banned them from entering campus grounds.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
];

// Create a new incident report
exports.createIncident = async (req, res) => {
  const { title, description, location, date, category, anonymous } = req.body;
  const reportedBy = req.user.id;

  try {
    if (!title || !description || !location || !category) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    if (getIsConnected()) {
      // MONGODB MODE
      const newIncident = new Incident({
        title,
        description,
        location,
        date: date || new Date(),
        category,
        anonymous: anonymous === true || anonymous === 'true',
        reportedBy,
        status: 'Reported'
      });

      const savedIncident = await newIncident.save();
      return res.status(201).json(savedIncident);
    } else {
      // MOCK MODE
      const mockId = 'mock_inc_' + Date.now();
      const newMockIncident = {
        _id: mockId,
        title,
        description,
        location,
        date: date ? new Date(date) : new Date(),
        category,
        anonymous: anonymous === true || anonymous === 'true',
        reportedBy: anonymous ? null : reportedBy,
        status: 'Reported',
        adminNotes: '',
        createdAt: new Date()
      };

      mockIncidents.push(newMockIncident);
      return res.status(201).json(newMockIncident);
    }
  } catch (err) {
    console.error('Create Incident Error:', err.message);
    res.status(500).json({ message: 'Server error while submitting incident report' });
  }
};

// Get all incidents (or user incidents)
exports.getIncidents = async (req, res) => {
  const { userOnly } = req.query;
  const userId = req.user.id;

  try {
    if (getIsConnected()) {
      // MONGODB MODE
      let query = {};
      if (userOnly === 'true') {
        query.reportedBy = userId;
      }

      let incidents = await Incident.find(query)
        .sort({ createdAt: -1 })
        .populate('reportedBy', 'fullName email faculty');

      // Strip reporter info if anonymous and not requested by the creator
      incidents = incidents.map(inc => {
        const doc = inc.toObject();
        if (doc.anonymous && doc.reportedBy && doc.reportedBy._id.toString() !== userId) {
          doc.reportedBy = null;
        }
        return doc;
      });

      return res.json(incidents);
    } else {
      // MOCK MODE
      let incidents = [...mockIncidents];
      if (userOnly === 'true') {
        incidents = incidents.filter(inc => inc.reportedBy === userId);
      }

      // Populate mock user detail if match
      const allUsers = getMockUsers();
      incidents = incidents.map(inc => {
        const matchedUser = allUsers.find(u => u.id === inc.reportedBy);
        return {
          ...inc,
          reportedBy: matchedUser ? { fullName: matchedUser.fullName, email: matchedUser.email, faculty: matchedUser.faculty } : null
        };
      });

      // Sort by date descending
      incidents.sort((a, b) => b.createdAt - a.createdAt);
      return res.json(incidents);
    }
  } catch (err) {
    console.error('Get Incidents Error:', err.message);
    res.status(500).json({ message: 'Server error while fetching incidents' });
  }
};

// Update incident status (Admin / testing utility)
exports.updateIncidentStatus = async (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  try {
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    if (getIsConnected()) {
      // MONGODB MODE
      const incident = await Incident.findById(id);
      if (!incident) {
        return res.status(404).json({ message: 'Incident not found' });
      }

      incident.status = status;
      if (adminNotes !== undefined) {
        incident.adminNotes = adminNotes;
      }

      await incident.save();
      return res.json(incident);
    } else {
      // MOCK MODE
      const incident = mockIncidents.find(inc => inc._id === id);
      if (!incident) {
        return res.status(404).json({ message: 'Incident not found (Mock DB)' });
      }

      incident.status = status;
      if (adminNotes !== undefined) {
        incident.adminNotes = adminNotes;
      }
      return res.json(incident);
    }
  } catch (err) {
    console.error('Update Status Error:', err.message);
    res.status(500).json({ message: 'Server error while updating report status' });
  }
};

// Get stats for Analytics
exports.getStats = async (req, res) => {
  try {
    let incidents = [];
    if (getIsConnected()) {
      incidents = await Incident.find({});
    } else {
      incidents = mockIncidents;
    }

    // Calculations
    const totalReports = incidents.length;
    const reported = incidents.filter(i => i.status === 'Reported').length;
    const investigating = incidents.filter(i => i.status === 'Under Investigation').length;
    const resolved = incidents.filter(i => i.status === 'Resolved').length;

    // Categories counter
    const categoryCounts = {
      'Harassment': 0,
      'Theft': 0,
      'Suspicious Activity': 0,
      'Poor Lighting': 0,
      'Medical Emergency': 0,
      'Other': 0
    };

    incidents.forEach(inc => {
      if (categoryCounts[inc.category] !== undefined) {
        categoryCounts[inc.category]++;
      } else {
        categoryCounts['Other']++;
      }
    });

    // Generate locations counts
    const locationCounts = {};
    incidents.forEach(inc => {
      const loc = inc.location || 'Unknown';
      locationCounts[loc] = (locationCounts[loc] || 0) + 1;
    });

    const locations = Object.keys(locationCounts).map(name => ({
      name,
      count: locationCounts[name]
    })).sort((a,b) => b.count - a.count).slice(0, 5);

    // AI Safety Rating Calculation: Start with 100, deduct points for open reports
    let safetyScore = 100 - (reported * 5) - (investigating * 2);
    if (safetyScore < 30) safetyScore = 30; // Min score baseline

    return res.json({
      totalReports,
      statusCounts: {
        reported,
        investigating,
        resolved
      },
      categoryCounts,
      locations,
      safetyScore: Math.round(safetyScore)
    });
  } catch (err) {
    console.error('Get Stats Error:', err.message);
    res.status(500).json({ message: 'Server error while generating dashboard statistics' });
  }
};
