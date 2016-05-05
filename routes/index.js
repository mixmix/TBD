var express = require('express');
var router = express.Router();
var db = require('../database/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getFeed', function(req, res, next) {

  if (req.session.userId){
    console.log('need to send signed in feed')
  } else {
    console.log('not signed in')
  }
  db.getPhotosByDate().then(function(result) {
    res.send(result)
  })
})



module.exports = router;
