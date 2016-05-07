var express = require('express');
var router = express.Router();
var db = require('../database/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//doesn't work yet, waiting on functionality to be decided
router.get('/getFeed', function(req, res, next) {
  if (req.session.userId){
    db.getPhotosByDate().then(function(result) {
      res.send(result)
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

router.get('/allLocations', function(req,res,next){
  db.getCountries()
    .then(function(countries){
      db.getCities()
        .then(function(cities){
          res.send({ cities: cities, countries: countries})
        })
    })

})

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



module.exports = router;
