var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getUserPhotos', function(req,res,next){
  if (!req.session.userId) {
    res.send({})
  } else {
    console.log("HERE")
    var user = { userId: req.session.userId }
    console.log('user', user)
    db.getUserPhotos(user).then(function(result){
      res.send(result)
    })
  }
})

router.post('/login', function(req,res,next){
  console.log(req.body)

})


module.exports = router;
