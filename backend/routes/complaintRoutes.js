const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.get('/', complaintController.getAllComplaints);
router.post('/', complaintController.createComplaint);

module.exports = router;
