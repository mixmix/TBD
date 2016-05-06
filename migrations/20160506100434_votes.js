
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('votes', function(table) {
    table.increments();
    table.integer('vote');
    table.integer('userId');
    table.integer('photoId');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('votes');
};
