
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function(table) {
    table.increments();
    table.string('firstName');
    table.string('lastName');
    table.string('email');
    table.string('password_hash');
    table.integer('styleRating');
    table.integer('connoisseurRating');
    table.biginteger('fb_id');
    table.biginteger('ig_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
