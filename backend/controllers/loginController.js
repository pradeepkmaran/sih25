const Login = require('../models/login');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await Login.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or email already in use' });
    }

    const newUser = new Login({ username, email, password });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body; // Changed from username to email

  try {
    const user = await Login.findOne({ email }); // Changed from username to email
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    await user.updateLoginTime();

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email }, // Added email to token
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id, // Added user ID
        username: user.username,
        email: user.email,
        loginTime: user.loginTime
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};