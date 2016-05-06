var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;
var db = require('../database/db');

//doesn't do anything
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})

//returns photos for a specific user based on the id, if the user hasn't logged in send an empty array
router.get('/getUserPhotos', function(req,res,next){
  if (!req.session.userId) {
    res.send([])
  } else {
    var user = { id: req.session.userId }
    db.getUserPhotos(user).then(function(result){
      console.log('user created:', result)
      res.send(result)
    })
  }
})

//creates a new user based on a post request
router.post('/new', function(req,res,next){
  var user = req.body
  bcrypt.hash(user.password, saltRounds, function(err, passwordHash){
    var newUser = { fullName: user.fullName, email: user.email, passwordHash: passwordHash, styleRating: 0, connoisseurRating: 0 }
    db.createUser(newUser).then(function(result){
      req.session.userId = result[0] //saves the user id returned from the new user created to the session
      res.send(newUser)
    })
  })
})

//user signs in
router.post('/login', function(req,res,next){
  var checkUser = { email: req.body.email}
  db.getUser(checkUser).then(function(returnedUsers){
    var returnedUser = returnedUsers[0]
    var validPassword = bcrypt.compareSync(req.body.password, returnedUser.passwordHash);
    if (validPassword){
      req.session.userId = returnedUser.id
      res.send({ name: returnedUser.fullName }) //sends the username once signed in
    }
  })
})

// user uploads image
router.post('/newImage', function(req, res, next) {
  var photoData = {
    link: req.body.link,
    category: req.body.categoryId,
    country: req.body.country,
    city: req.body.city,
    userId: req.session.userId,
    caption: req.body.caption,
    rating: 0
  }
  db.insertPhoto(photoData).then(function(response) {
    res.send('Hello there')
  })
})

module.exports = router;
