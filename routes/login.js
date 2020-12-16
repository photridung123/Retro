const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const passport = require('../passport');

/* GET home page. */
router.get('/', loginController.index);
router.post('/' ,passport.authenticate('local',{
    successRedirect: '/dashboard',
    failureRedirect: '/register',
    failureFlash: false
}))

module.exports = router;