var express = require('express');
var router = express.Router();
var db = require('../database/db');

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

router.get('/getUserPhotos', function(req,res,next){
  if (!req.session.userId) { res.send({}) }
  else {
    var user = { userId: req.session.userId }
    db.getUserPhotos(user).then(function(result){
      res.send(result)
    })
  }
})


router.get('/test', function(req,res,next){
  res.send('test')
})
module.exports = router;
