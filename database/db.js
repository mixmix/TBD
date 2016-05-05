var Knex = require('knex');
var knexConfig = require(__dirname + '/../knexfile');

var knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])



module.exports = {
  getUsers: function() {
    return knex.select().table('users')
  },
  getImages: function() {
    return knex.select().table('photos')
  },
  getImagesByDate: function() {
    return knex.select().table('photos').orderBy('created_at','desc')
  },
  close: function() {
    return knex.destroy();
  },
  findOrCreate: function(user, cb){
      knex('users').where(user)
        .then(function(result){
          if (result.length > 0) {
            cb(result[0])
          } else {
            knex('users').insert(Object.assign({},user, {styleRating: 0, connoisseurRating: 0})).then(function(result){
              knex('users').where(user).then(function(resultUser){ cb(resultUser[0])})
            })
          }
        })
    }

}
