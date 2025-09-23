const mongoose = require('mongoose');

const fieldworkSchema = new mongoose.Schema({
  assignmentId: { type: String, unique: true, required: true }, // like FW001
  complaint: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  status: { type: String, default: "Assigned" },
  notes: String,
  startDate: { type: Date, default: Date.now },
  endDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Fieldwork', fieldworkSchema);
