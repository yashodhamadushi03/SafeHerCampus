const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getIsConnected } = require('../config/db');

// Hybrid mock database store for when MongoDB is disconnected
const mockUsers = [];

// Helper to sign JWT
const generateToken = (userId) => {
  const payload = {
    user: {
      id: userId
    }
  };
  const secret = process.env.JWT_SECRET || 'safehercampus_secret_key_123';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

// Register User
exports.register = async (req, res) => {
  const { fullName, email, faculty, academicYear, password } = req.body;

  try {
    // Validate inputs
    if (!fullName || !email || !faculty || !academicYear || !password) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    if (getIsConnected()) {
      // MONGODB MODE
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      user = new User({
        fullName,
        email,
        faculty,
        academicYear,
        password
      });

      await user.save();
      const token = generateToken(user.id);
      return res.status(201).json({ token, user: { id: user.id, fullName, email, faculty, academicYear } });
    } else {
      // MOCK MODE
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email (Mock DB)' });
      }

      // Hash password manually for mock user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const mockId = 'mock_user_' + Date.now();
      const newMockUser = {
        id: mockId,
        _id: mockId,
        fullName,
        email: email.toLowerCase(),
        faculty,
        academicYear,
        password: hashedPassword,
        createdAt: new Date()
      };

      mockUsers.push(newMockUser);
      const token = generateToken(mockId);
      return res.status(201).json({ token, user: { id: mockId, fullName, email, faculty, academicYear } });
    }
  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    if (getIsConnected()) {
      // MONGODB MODE
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user.id);
      return res.json({
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          faculty: user.faculty,
          academicYear: user.academicYear
        }
      });
    } else {
      // MOCK MODE
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials (Mock DB)' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials (Mock DB)' });
      }

      const token = generateToken(user.id);
      return res.json({
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          faculty: user.faculty,
          academicYear: user.academicYear
        }
      });
    }
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get User Profile
exports.getMe = async (req, res) => {
  try {
    if (getIsConnected()) {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } else {
      const user = mockUsers.find(u => u.id === req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found (Mock DB)' });
      }
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    }
  } catch (err) {
    console.error('Profile fetch error:', err.message);
    res.status(500).json({ message: 'Server error fetching user profile' });
  }
};

// Export raw mock array for mock incident creation links
exports.getMockUsers = () => mockUsers;
