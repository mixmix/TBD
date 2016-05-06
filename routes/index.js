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



module.exports = router;
