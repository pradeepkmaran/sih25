const express = require('express');
const router = express.Router();

const complaintRoutes = require('./complaintRoutes');
const userRoutes = require('./userRoutes');
const departmentRoutes = require('./departmentRoutes');
const branchRoutes = require('./branchRoutes');
const employeeRoutes = require('./employeeRoutes');
const fieldworkRoutes = require('./fieldworkRoutes');
const workorderRoutes = require('./workorderRoutes');

router.use('/complaints', complaintRoutes);
router.use('/users', userRoutes);
router.use('/departments', departmentRoutes);
router.use('/branches', branchRoutes);
router.use('/employees', employeeRoutes);
router.use('/fieldworks', fieldworkRoutes);
router.use('/workorders', workorderRoutes);

module.exports = router;
