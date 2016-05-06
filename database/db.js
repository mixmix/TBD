var Knex = require('knex');
var knexConfig = require(__dirname + '/../knexfile');

var knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

module.exports = {
  getUsers: function() {
    return knex.select().table('users')
  },
  getPhotos: function() {
    return knex.select().table('photos')
  },
  getPhotosByDate: function() {
    return knex.select().table('photos').orderBy('created_at','desc')
  },
  findOrCreate: function(user, cb){
      knex('users').where(user)
        .then(function(result){
          if (result.length > 0) {
            cb(result[0])
          } else {
            knex('users')
              .insert(Object.assign({},user, {styleRating: 0, connoisseurRating: 0}))
              .then(function(result){
                knex('users').where(user)
                  .then(function(resultUser){ cb(resultUser)})
              })
          }
        })
  },
  getVotes: function() {
    return knex('votes')
  },
  getUserPhotos: function(user){
    return knex('photos').where(user)
  },
  getUser: function(user){
    return knex('users').where(user)
  },
  createUser: function(user){
    return knex('users').insert(user)
  },
  clearUsers: function(){
    return knex('users').del()
  },
  insertUsers: function(users){
    return knex('users').insert(users)

  }
}
