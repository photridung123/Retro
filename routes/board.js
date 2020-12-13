const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

/* GET home page. */
router.get('/', boardController.index);

module.exports = router;
