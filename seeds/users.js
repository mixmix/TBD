var bcrypt = require('bcrypt');
const saltRounds = 10;


exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({id: 1, firstName: 'Andrew', lastName: 'Wadman',password_hash: bcrypt.hashSync('password', saltRounds), email: 'andrewwadman@gmail.com', styleRating: 1, connoisseurRating: 1, fb_id: 1, ig_id: 1}),
    knex('users').insert({id: 2, firstName: 'Sam', lastName: 'Simmons',password_hash: bcrypt.hashSync('password', saltRounds), email: 'samsimmons@gmail.com', styleRating: 2, connoisseurRating: 2, fb_id: 2, ig_id: 2}),
    knex('users').insert({id: 3, firstName: 'Vicken', lastName: 'Liu',password_hash: bcrypt.hashSync('password', saltRounds), email: 'vickenliu@gmail.com', styleRating: 3, connoisseurRating: 3, fb_id: 3, ig_id: 3}),
    knex('users').insert({id: 4, firstName: 'Tony', lastName: 'Luisi',password_hash: bcrypt.hashSync('password', saltRounds), email: 'vickenliu@gmail.com', styleRating: 3, connoisseurRating: 3, fb_id: 10156915534565451, ig_id: 3})
  );
};


//
// exports.up = function(knex, Promise) {
//   return knex.schema.createTableIfNotExists('users', function(table) {
//     table.increments();
//     table.string('firstName');
//     table.string('lastName');
//     table.string('email');
//     table.integer('styleRating');
//     table.integer('connoisseurRating');
//     table.biginteger('fb_id');
//     table.biginteger('ig_id');
//   })
// };
