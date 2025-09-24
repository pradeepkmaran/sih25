const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintId: String,
  title: String,
  description: String,
  location: String,
  status: String,
  priority: String,
  category: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdDate: Date,
  resolvedDate: Date,
  workOrderNumber: String,
  images: [String],
  upvotes: Number,
  comments: Number,
});

module.exports = mongoose.model('Complaint', complaintSchema);