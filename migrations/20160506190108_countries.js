
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('countries', function(table) {
    table.increments();
    table.string('code');
    table.string('name');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('countries');
};
