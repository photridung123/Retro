const express = require('express');
const router = express.Router();
const forgotController = require('../controllers/forgotController');

/* GET home page. */
router.get('/', forgotController.index);

module.exports = router;
