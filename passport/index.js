const passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
const userService = require('../models/userModel');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
  async function(username, password, done) {
    const user = await userService.checkCredential(username,password);
    if(!user)
    {
      return done(null, false, { message: 'Incorrect email or password.' });
    }
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  userService.getUser(id).then((user) => {
    done(null, user);
  })
});

module.exports = passport;