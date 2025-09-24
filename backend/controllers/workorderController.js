const WorkOrder = require('../models/workorder');

exports.getAllWorkOrders = async (req, res) => {
    try {
        const workOrders = await WorkOrder.find();
        res.json(workOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createWorkOrder = async (req, res) => {
    try {
        const workOrder = new WorkOrder(req.body);
        const saved = await workOrder.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};