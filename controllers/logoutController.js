const passport = require('../passport');

exports.index = (req, res, next) => {
    req.logout();
    res.redirect('/');
};
