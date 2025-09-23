const mongoose = require('mongoose');

const WorkOrderSchema = new mongoose.Schema({
    workOrderId: { type: String, required: true, unique: true },
    task: { type: String, required: true },
    details: { type: String },
    location: { type: String, required: true },
    assignedTo: { type: String },
    priority: { type: String, enum: ['Critical', 'High', 'Medium', 'Low'], default: 'Medium' },
    status: { type: String, enum: ['Open', 'In Progress', 'Completed', 'Closed'], default: 'Open' },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('WorkOrder', WorkOrderSchema);