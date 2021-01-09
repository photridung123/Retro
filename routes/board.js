const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

/* GET home page. */
router.get('/:id', boardController.index);


module.exports = router;
