var db = require('../../database/db');

var expect = require('chai').expect;


describe('Database', function() {
  describe('Users', function(){
    beforeEach(function() {
      console.log('before')

      var testUsers = [
        {id: 4,
          fullName: 'Tony Luisi' ,
          passwordHash: 'password', email: 't.luisi@gmail.com', styleRating: 3, connoisseurRating: 3, fbId: 10156915534565451, igId: 3},
        {id: 1, fullName: 'Andrew Wadman', profilePicture: "https://s-media-cache-ak0.pinimg.com/236x/13/4a/78/134a78460defef0bc46ef4bd2174e7f0.jpg", passwordHash: 'password', email: 'andrewwadman@gmail.com', styleRating: 1, connoisseurRating: 1, fbId: 1, igId: 1}
      ]
      db.clearAndInsertUsers().then(
        function(result){

        }
      )


    });
    afterEach(function() {
      console.log('after')

    });
    it('should return all users', function(done) {
      db.getUsers().then(function(result) {
        expect(result.length).to.be.equal(4)
        expect(result[0].fullName).to.be.equal('Andrew Wadman');
        done()
      })
    })
    it('should return all other users', function(done) {
      db.getUsers().then(function(result) {
        expect(result.length).to.be.equal(4)
        expect(result[0].fullName).to.be.equal('Andrew Wadman');
        done()
      })
    })
  })
})
