const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

/* GET home page. */
router.get('/:id', boardController.index);
router.post('/:id/add-cmt', boardController.AddCmt);
router.post('/:id/vote', boardController.Vote);

module.exports = router;
