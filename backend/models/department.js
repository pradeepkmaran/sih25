const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
deptid: String,
  name: String,
  officeLocation: String,
  contactNumber: String,
  email: String
});

module.exports = mongoose.model('Department', departmentSchema);