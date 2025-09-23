const express = require('express');
const router = express.Router();
const fieldworkController = require('../controllers/fieldworkController');

router.get('/', fieldworkController.getAllFieldworks);
router.post('/', fieldworkController.createFieldwork);

module.exports = router;
