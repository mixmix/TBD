var express = require('express');
var router = express.Router();
var db = require('../database/db');

//this route is for testing api to database requests and seeing data in the database

router.get('/getUsers', function(req, res, next) {
  db.getUsers().then(function (result) {
    res.send(result)
  })
})

router.get('/sessionID', function(req,res,next){
  res.send(req.sessionID)
})

router.get('/getVotes', function(req,res,next){
  db.getVotes().then(function(result){
    res.send(result)
  })
})

router.get('/test', function(req,res,next){
  res.send('test')
})

router.get('/feedByUser', function(req,res,next){
  db.getVotesByUserId({ id: req.session.userId })
    .then(function(votes){
      db.getPhotos()
        .then(function(photos){
          photos = photos.filter(function(photo){
            if (photo.userId === req.session.userId) {
              return false
            }
            var notVotedOn = false
            votes.map(function(vote){
              if (photo.id !== vote.photoId) {
                notVotedOn = true
              }
            })
            return notVotedOn
          })
          res.send(photos)
        })
    })
})
module.exports = router;
