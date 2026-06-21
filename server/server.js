const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for dev/testing, can be restricted later
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect Database
connectDB();

// Basic API Check
app.get('/', (req, res) => {
  res.json({ message: 'SafeHerCampus API is running successfully.' });
});

// Bind API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/incidents', require('./routes/incidentRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Listen Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
