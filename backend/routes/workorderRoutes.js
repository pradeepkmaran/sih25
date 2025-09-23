const express = require('express');
const router = express.Router();
const workorderController = require('../controllers/workorderController');

router.get('/', workorderController.getAllWorkOrders);
router.post('/', workorderController.createWorkOrder);

module.exports = router;