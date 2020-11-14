const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');

/* GET home page. */
router.get('/', pricingController.index);

module.exports = router;