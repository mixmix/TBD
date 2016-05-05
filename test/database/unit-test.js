var db = require('../../database/db');

var expect = require('chai').expect;

describe('Database', function() {

  it('should return all users', function(done) {
    db.getUsers().then(function(result) {
      console.log("Log here: ", result);
      expect(result).to.be.ok();
      console.log("i am running: ");
      db.close();
      done()
    })
  })
})
