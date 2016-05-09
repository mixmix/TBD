require('dotenv').config();
var nodeEnv = process.env.NODE_ENV 
var path = require('path');
//express
var express = require('express');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

//knex
var Knex = require('knex');
var knexConfig = require(__dirname + '/knexfile');
var knex = Knex(knexConfig[ nodeEnv || 'development']);

//passport
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var InstagramStrategy = require('passport-instagram');

var db = require('./database/db');

//routes
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var test = require('./routes/test');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));  // whats dev ?    process.env.NODE_ENV
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session initialisation
app.use(session({
  secret: 'This is a secret!',  // env var
  saveUninitialized: true,
  resave: true,
  db: knex,
  cookie: {maxAge: 24*60*60*1000}
}))

//Passport initialisation
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
    var checkUser = {
      fullName: user.displayName,
      email:    user.emails[0].value,
      fbId:     user.id
    }
    db.findOrCreate(checkUser, function(returnedUser){   // promise this then
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
    var user = profile
    var checkUser = {}
    checkUser.fullName = user.displayName
    checkUser.igId = user.id
    db.findOrCreate(checkUser, function(returnedUser){  //.then
      user.dbid = returnedUser.id
      return cb(null, user)
    })
  }
));

passport.serializeUser(function(user, cb) {
  // find the userId (our app one) and serialize that
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  // console.log
  // look up user based on userId
  cb(null, fullUserObj);
});

//routing
app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth)
//app.use('/test', test)   dev thing ? 
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, './public', 'index.html'))
})

module.exports = app;

