
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function(table) {
    table.increments();
    table.string('fullName').notNullable();
    table.string('email').unique();
    table.string('profileUrl');
    table.string('passwordHash');
    table.integer('styleRating');
    table.integer('connoisseurRating'); // hard to spell
    table.biginteger('fbId');
    table.biginteger('igId');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
