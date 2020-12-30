const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

/* GET home page. */
router.get('/', accountController.index);
router.post('/change/email', accountController.changeEmail);
router.post('/change/username', accountController.changeUsername);
router.post('/user/type',accountController.getUserType);

module.exports = router;