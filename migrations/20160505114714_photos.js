
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('photos', function(table) {
    table.increments();
    table.integer('countryId');
    table.integer('cityId');
    table.string('link').notNullable();
    table.string('caption');
    table.integer('userId').notNullable()
    table.integer('categoryId').notNullable
    table.integer('rating'); // this is computed ...
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('photos');
};
