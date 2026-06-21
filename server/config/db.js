const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/safehercampus';
  console.log(`Connecting to MongoDB at: ${mongoURI}`);
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    isConnected = true;
    console.log('MongoDB Connected Successfully!');
  } catch (err) {
    console.error('MongoDB Connection Failure:', err.message);
    console.log('Application will run in Hybrid/Mock mode for testing.');
    isConnected = false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
