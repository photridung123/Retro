const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('./passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const pricingRouter = require('./routes/pricing');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const forgotRouter = require('./routes/forgot');
const teamRouter = require('./routes/team');
const dashboardRouter = require('./routes/dashboard');
const analyticsRouter = require('./routes/analytics');
const accountRouter = require('./routes/account');
const logoutRouter = require('./routes/logout');
const boardRouter = require('./routes/board');

const hbs = require('hbs');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/main' });
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('if_eq', function(a, b, opts) {
  if (a == b) {
      return opts.fn(this);
  } else {
      return opts.inverse(this);
  }
});
hbs.registerHelper('add', function(a, b) {
  return a + b;
});

hbs.registerHelper('format_date', function(current_datetime) {
  const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return current_datetime.getDate()  + " " + months[current_datetime.getMonth()];
});

// passport
app.use(session({secret: 'tripleD',resave: false,saveUninitialized: true,})); // TODO: đưa secret vào env
app.use(passport.initialize());
app.use(passport.session());
// pass req.user to res.locals
app.use(function(req,res,next){
  res.locals.user = req.user;
  next();
})
// middleware check loggedin

function checkAcessible(req, res, next) {
  if (req.user) {
      next();
  } else {
      res.redirect('/login');
  }
}

function isLogged(req, res, next) {
  if (req.user) {
      res.redirect('/dashboard');
  } else {
      next();
  }
}


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/logout',logoutRouter);
app.use('/users', usersRouter);
app.use('/pricing',pricingRouter);
app.use('/register', isLogged ,registerRouter);
app.use('/login', isLogged ,loginRouter);
app.use('/forgot', isLogged ,forgotRouter);
app.use('/team', checkAcessible ,teamRouter);
app.use('/dashboard', checkAcessible ,dashboardRouter);
app.use('/analytics', checkAcessible ,analyticsRouter);
app.use('/account', checkAcessible ,accountRouter);
app.use('/board', checkAcessible ,boardRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).render('404')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
