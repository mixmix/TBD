var express = require('express');
var router = express.Router();
var db = require('../database/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//if a user isn't logged in will return all photos, otherwise will return photos not voted on and not belonging to the user
router.get('/getFeed', function(req, res, next) {
  if (req.session.userId){
    db.getVotesByUserId({ id: req.session.userId })
      .then(function(votes){
        db.getPhotos()
          .then(function(photos){
            photos = photos.filter(function(photo){
              if (photo.userId === req.session.userId) {
                return false
              }
              var notVotedOn = true
              votes.map(function(vote){
                if (photo.id === vote.photoId) {
                  notVotedOn = false
                }
              })
              return notVotedOn
            })
            res.send(photos)
          })
      })
  } else {
    db.getPhotosByDate().then(function(result) {
      res.send(result)
    })
  }
})

//just gets locations that have got counts on them
router.get('/locations', function(req,res,next){
  db.getCountriesByCount()
    .then(function(countries){
      db.getCitiesByCount()
        .then(function(cities){
          res.send({ cities: cities, countries: countries})
        })
    })

})

//gets all locations
router.get('/allLocations', function(req,res,next){
  db.getCountries()
    .then(function(countries){
      db.getCities()
        .then(function(cities){
          res.send({ cities: cities, countries: countries})
        })
    })

})

//gets location by feed
router.post('/locations/getFeed', function(req,res,next){
  if (req.body.city){
    db.getFeedByLocation({ city: req.body.city })
      .then(function(feed){
        res.send(feed)
      })
  } else if (req.body.country){
    db.getFeedByLocation({ country: req.body.country })
      .then(function(feed){
        res.send(feed)
      })
  } else {
    res.send({})
  }
})

//gets catergories
router.get('/getCategories', function(req, res, next) {
  db.getCategories().then(function(result) {
    res.send(result)
  })
})

module.exports = router;
