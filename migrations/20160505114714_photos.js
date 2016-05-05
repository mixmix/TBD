
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('photos', function(table) {
    table.increments();
    table.string('country');
    table.string('city');
    table.string('email');
    table.string('link');
    table.integer('userId');
    table.integer('rating');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('photos');
};
