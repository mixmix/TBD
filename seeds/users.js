
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({id: 1, firstName: 'Andrew', lastName: 'Wadman', email: 'andrewwadman@gmail.com', styleRating: 1, connoisseurRating: 1, fb_id: 1, ig_id: 1}),
    knex('users').insert({id: 2, firstName: 'Sam', lastName: 'Simmons', email: 'samsimmons@gmail.com', styleRating: 2, connoisseurRating: 2, fb_id: 2, ig_id: 2}),
    knex('users').insert({id: 3, firstName: 'Vicken', lastName: 'Liu', email: 'vickenliu@gmail.com', styleRating: 3, connoisseurRating: 3, fb_id: 3, ig_id: 3})
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
