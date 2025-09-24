const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const loginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  loginTime: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
loginSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password
loginSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Update login time
loginSchema.methods.updateLoginTime = async function () {
  this.loginTime = new Date();
  await this.save();
};

module.exports = mongoose.model('Login', loginSchema);
