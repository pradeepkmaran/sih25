const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true }, // e.g. "T Nagar EB Office"
  empId: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  specialization: { type: String },
  experience: { type: String }, // could also be Number of years
  currentAssignments: { type: Number, default: 0 },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }, // 🔗 reference branch
  jurisdiction: { type: String }, // only for higher roles
  officesUnder: { type: Number }   // only for SE, etc.
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
