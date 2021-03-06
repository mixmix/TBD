var Knex = require('knex');
var knexConfig = require(__dirname + '/../knexfile');

var knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

module.exports = {
  getUsers: function() { //not needed for production
    return knex.select().table('users')
  },
  getPhotos: function() { //gets all photos
    return knex.select().table('photos')
  },
  getPhotosByDate: function() { //gets all photos by date
    return knex.select().table('photos').limit(50).orderBy('created_at','desc')
  },
  findOrCreate: function(user, cb){ //finds or create photos
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
  getVotes: function() { //gets all votes
    return knex('votes')
  },
  getUserPhotos: function(user){
    return knex('photos').where(user)
  },
  getUser: function(user){
    return knex('users').where(user)
  },
  getCategories: function() {
    return knex('categories')
  },
  createUser: function(user){
    return knex('users').insert(user)
  },
  clearUsers: function(){
    return knex('users').del()
  },
  insertUsers: function(users){
    return knex('users').insert(users)
  },
  insertPhoto: function(photoData){
    return knex('photos').insert(photoData)
  },
  getCountries: function(){
    return knex('countries')
  },
  getCities: function(){
    return knex('cities')
  },
  getFeedByLocation: function(location){
    return knex('photos').where(location)
  },
  postVote: function(vote){
    if (vote.vote > 0) {
      vote.vote = 1
    } else {
      vote.vote = 0
    }
    return knex('votes').insert(vote)
      .then(function(result){
        knex('photos').where('id', '=', vote.photoId).increment('rating', vote.vote)
      })
  },
  getCountriesByCount: function(){
    return knex('countries').where('count', '>', 0)
  },
  getCitiesByCount: function(){
    return knex('cities').where('count', '>', 0)
  },
  getPhotosByDateNotVotedOn: function(){
    return knex('photos').crossJoin('votes', 'photos.id', 'votes.photoId')
  },
  getVotesByUserId: function(user) {
    return knex('votes').where(user)
  },
  getPhotosByUserId: function(userId) {
    return knex('photos').where({userId: userId})
  }
}
