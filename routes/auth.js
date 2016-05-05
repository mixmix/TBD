var express = require('express');
var router = express.Router();
var path = require('path')
var passport = require('passport')

/* GET users listing. */
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.userId = req.user.dbid
    res.send(req.session);
  });

module.exports = router;
