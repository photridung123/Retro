const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

/* GET home page. */
router.get('/', teamController.index);

module.exports = router;