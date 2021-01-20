const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

/* GET home page. */
router.get('/', analyticsController.index);

module.exports = router;