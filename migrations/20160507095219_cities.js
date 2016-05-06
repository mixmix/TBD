
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('cities', function(table) {
    table.increments();
    table.string('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cities');
};

//id,countryCode,languageScript,name,latitude,longitude
