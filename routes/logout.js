const express = require('express');
const logoutController = require('../controllers/logoutController')
const router = express.Router();

/* GET home page. */
router.get('/', logoutController.index);

module.exports = router;