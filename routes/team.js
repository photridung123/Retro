const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

/* GET home page. */
router.get('/', teamController.index);
router.post('/add', teamController.add);
router.post('/delete', teamController.delete);

module.exports = router;