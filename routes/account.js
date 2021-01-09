const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

/* GET home page. */
router.get('/', accountController.index);
router.post('/change/email', accountController.changeEmail);
router.post('/change/username', accountController.changeUsername);
router.post('/change/avatar',accountController.changeAvatar);
router.get('/user/type',accountController.getUserType);
router.get('/user/id',accountController.getUserId);

module.exports = router;