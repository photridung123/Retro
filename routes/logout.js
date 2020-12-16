const express = require('express');
const router = express.Router();
const passport = require('../passport');

/* GET home page. */
router.get('/', function(req,res){
    req.logout();
    res.redirect('/');
});

module.exports = router;