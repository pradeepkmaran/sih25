const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  citizenId: { type: String, unique: true }, // or uuid
  dob: Date,
  location: String,
  gender: String,
  email: { type: String, unique: true },
});

module.exports = mongoose.model('User', userSchema);