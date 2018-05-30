const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const mongodbStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const users = require('./config/users');

const app = express();
const configDB = require('./config/database.js');
mongoose.connect(configDB.url, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', function (err) {
  console.error('There was a db connection error');
  return  console.error(err.message);
});
db.once('connected', function () {
  return console.log('Successfully connected to ' + configDB.url);
});
db.once('disconnected', function () {
  return console.error('Successfully disconnected from ' + configDB.url);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

// required for passport
app.use(session({
  name: 'xpressBlu.sess', store: new mongodbStore({
  mongooseConnection: mongoose.connection,
  touchAfter: 24 * 3600}),
  secret: 'feliscatusisyourtaxonomicnomenclature',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 3600 * 24 * 7}
})); // session secret
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));

function showReq(req, res, next) {
  console.log(req.body)
  return next();
}

function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
    console.log("logged in");
    return next();
  };
	// if they aren't redirect them to the home page
  console.log("not logged in")
	res.redirect('/');
};

function userAllowed(req, res, next) {
  console.log(req.body)
  if(users[req.body.email]) {
    return next();
  } else {
    	res.send('Access denied, please contact the site administrator');
  }
}

app.use('/apwh/login', showReq);
app.use('/apwh/admin', isLoggedIn);
app.use('/apwh/register', userAllowed);
app.use('/', indexRouter(passport));


// error handler
app.use(function(err, req, res, next) {
  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.sendFile(path.join(__dirname + "/views/error.html"));
});

module.exports = app;
