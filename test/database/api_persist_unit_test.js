var request = require('superagent');
var user = request.agent();
var expect = require('chai').expect;

//tests that need to be written
//feed
  //get feed
    //if not signed in gets all the photos the first 50
    //if signed in doesn't get photos voted on or photos

  //locations
  //all locations
  //post locations /get feed
  //get categories

//user
  //gets user photos
  //post a new user
  //sign in
  //upload image
  //post a vote

describe('feed', function() {
  describe('get feed', function(){
    beforeEach(function(done) {
      user
        .post('http://localhost:3000/users/login')
        .send({ email: 't.luisi@gmail.com', password: 'password' })
        .end(function(err, res){
          // console.log('res', res.text)
          done()
        })
    })
    it('should get all the feeds', function(done) {
      user
        .get('http://localhost:3000/getFeed')
        .end(function(err, res){
          console.log('res', JSON.parse(res.text))
          done()
        })

    })
  })
})
