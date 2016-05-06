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



router.get('/test', function(req,res,next){
  res.send('test')
})
module.exports = router;
