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
      res.send({ name: user.fullName, photos: [] })
    }).catch(function(error){
      res.status(500).send("ERROR User Exists")
    })
  })
})

//user signs in
router.post('/login', function(req,res,next){
  var checkUser = { email: req.body.email}
  db.getUser(checkUser).then(function(returnedUsers){
    if (returnedUsers.length === 0) {
      res.status(403).send({ error: 'user not found'})
      return
    }
    var returnedUser = returnedUsers[0]
    var validPassword = bcrypt.compareSync(req.body.password, returnedUser.passwordHash);
    if (validPassword){
      req.session.userId = returnedUser.id
      db.getPhotosByUserId(req.session.userId)
        .then(function(photos){
          res.send({ name: returnedUser.fullName, photos: photos })
        })
    } else {
      res.status(403).send({ error: 'invalid password'})
    }
  })
})

// user uploads image
router.post('/newImage', function(req, res, next) {
  var photoData = {
    link: req.body.link,
    categoryId: req.body.categoryId,
    rating: 0,
    countryId: req.body.countryId,
    cityId: req.body.cityId,
    userId: req.session.userId,
    caption: req.body.caption,

  }
  db.insertPhoto(photoData).then(function(response) {
    res.send('Hello there')
  })
})

//user posts votes
router.post('/vote', function(req,res,next){
  if (req.session.userId){
    console.log(req.body)
    var vote = { vote: req.body.vote, photoId: req.body.photoId, userId: req.session.userId}
    db.postVote(vote)
      .then(function(result){
        res.send({ message: "success" })
      })
      .catch(function(error){
        res.status(400).send(error)
      })
  } else {
    res.status(400).send({})
  }
})

router.get('/getUserPhotos', function(req, res, next){
  if(req.session.userId){
    db.getPhotosByUserId(req.session.userId)
      .then(function(photos){
        res.send(photos)
      })
  } else {
    res.status(400).send({})
  }
})

router.get('/loggedIn', function(req, res, next){
  if (req.session.userId){
    var checkUser = { id: req.session.userId }
    db.getUser(checkUser).then(function(returnedUsers){
      var returnedUser = returnedUsers[0]
      db.getPhotosByUserId(req.session.userId)
        .then(function(photos){
          res.send({ name: returnedUser.fullName, photos: photos })
        })
    })
  } else {
    res.status(400).send({})
  }
})

module.exports = router;
