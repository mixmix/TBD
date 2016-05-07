var db = require('../../database/db');

var expect = require('chai').expect;

//tests to be written

//database unit tests
//gets photos sorted by date - getPhotosByDate
//find or create - findOrCreate user
//getUserPhotos - gets photos for a specific user
//getUser - gets a specific user
//insert user
//insert photo
//get feed by location
//post a vote
//get country by count
//get cities by count
//get photos by date not voted on

describe('Database', function() {
  describe('Users', function(){
    it('should return a specific user', function(done) {
      db.getUser({ id: 1 })
        .then(function(result) {
        expect(result.length).to.be.equal(1)
        expect(result[0].fullName).to.be.equal('Andrew Wadman');
        done()
      })
    })
  })
})
