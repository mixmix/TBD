
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('cities', function(table) {
    table.increments();
    table.string('countryCode');
    table.string('languageScript');
    table.string('name');
    table.float('latitude');
    table.float('longitude');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cities');
};

//id,countryCode,languageScript,name,latitude,longitude
