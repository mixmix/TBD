var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;
var db = require('../database/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getUserPhotos', function(req,res,next){
  if (!req.session.userId) {
    res.send([])
  } else {
    var user = { id: req.session.userId }
    db.getUserPhotos(user).then(function(result){
      console.log('user created:', result)
      res.send(result)
    })
  }
})

router.post('/new', function(req,res,next){
  //create the user on the database
  //email and password
  console.log('new user')

  var user = req.body
  bcrypt.hash(user.password, saltRounds, function(err, passwordHash){
    var newUser = { fullName: user.fullName, email: user.email, passwordHash: passwordHash, styleRating: 0, connoisseurRating: 0 }
    db.createUser(newUser).then(function(result){
      req.session.userId = result[0]
      res.send(newUser)
      // db.getUser({id: result[0]}).then(function(userResult){
      //   console.log('user', userResult)
      //   res.send(userResult)
      // })
    })
  })



  //username
  //photo
})

router.post('/login', function(req,res,next){
  var checkUser = { email: req.body.email}
  db.getUser(checkUser).then(function(returnedUsers){
    var returnedUser = returnedUsers[0]
    var validPassword = bcrypt.compareSync(req.body.password, returnedUser.passwordHash);
    if (validPassword){
      req.session.userId = returnedUser.id
      res.send({ name: returnedUser.fullName })
    }
  })
})


module.exports = router;
