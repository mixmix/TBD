var express = require('express');
var router = express.Router();
var db = require('../database/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getFeed', function(req, res, next) {
  db.getImagesByDate().then(function(result) {
    res.send(result)
  })
})

router.get('/getUsers', function(req, res, next) {
  db.getUsers().then(function (result) {
    res.send(result)
  })
})

router.get('/sessionID', function(req,res,next){
  res.send(req.sessionID)
})


module.exports = router;
