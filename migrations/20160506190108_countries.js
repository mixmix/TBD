
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('countries', function(table) {
    table.increments();
    table.string('code');
    table.string('name');
    table.integer('count').defaultTo(0) // not needed I think ?

    //knex('countries').join('photos').count()
    //groups photos by countries and count them
    //
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('countries');
};
