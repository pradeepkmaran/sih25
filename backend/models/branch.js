const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
 branchid:String,
  name: String,
  location: String,
  contactNumber: String,
  email: String,
  dept:{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }
});

module.exports = mongoose.model('Branch', branchSchema);