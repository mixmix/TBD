require('dotenv').config();

var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')


var db = require('./database/db');

//knex
var Knex = require('knex');
var knexConfig = require(__dirname + '/knexfile');
var knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

//passport
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var InstagramStrategy = require('passport-instagram');


var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var test = require('./routes/test');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'This is a secret!',
  saveUninitialized: true,
  resave: true,
  db: knex,
  cookie: {maxAge: 24*60*60*1000}
}))

console.log(process.env.DOMAIN)
app.use(passport.initialize());
app.use(passport.session());

// Facebook strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.DOMAIN + "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    var user = profile
    console.log(user)
    var checkUser = {}
    checkUser.fullName = user.displayName
    checkUser.email = user.emails[0].value
    checkUser.fbId = user.id
    db.findOrCreate(checkUser, function(returnedUser){
      user.dbid = returnedUser.id
      return cb(null, user)
    })
  }
));

// Instagram strategy
passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: process.env.DOMAIN + "/auth/instagram/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    var user = profile
    var checkUser = {}
    checkUser.fullName = user.displayName
    checkUser.igId = user.id
    db.findOrCreate(checkUser, function(returnedUser){
      user.dbid = returnedUser.id
      return cb(null, user)
    })
  }
));


passport.serializeUser(function(user, cb) {
  //this gets called around verification
  // console.log("<<  ".green + "I just serialized a user".red, new Date().toJSON() )
  // console.log("<<  ", user)
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  // this gets called with req.user
  // console.log(">>  ".green + "I just deserialize a user".red)
  // console.log(">>  ", obj)
  cb(null, obj);
});

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth)
app.use('/test', test)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
