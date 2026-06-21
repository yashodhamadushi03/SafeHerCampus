const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  category: {
    type: String,
    required: true,
    enum: ['Harassment', 'Theft', 'Suspicious Activity', 'Poor Lighting', 'Medical Emergency', 'Other']
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  status: {
    type: String,
    enum: ['Reported', 'Under Investigation', 'Resolved'],
    default: 'Reported'
  },
  adminNotes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Incident', IncidentSchema);
