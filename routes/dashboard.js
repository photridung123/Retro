const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

/* GET home page. */
router.get('/',  dashboardController.index);

module.exports = router;
