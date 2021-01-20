const express = require('express');
const router = express.Router();
const joinController = require('../controllers/joinController');

/* GET home page. */
router.get('/:invitationCode', joinController.index);

module.exports = router;
