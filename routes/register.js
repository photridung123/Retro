const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

/* GET home page. */
router.get('/', registerController.index);
router.post('/',registerController.addUser);

module.exports = router;