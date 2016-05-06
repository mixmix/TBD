var seeder = require('knex-csv-seeder');

exports.seed = seeder.seeder.seed({
  table: 'cities',
  file: __dirname + '/../datasets/citiesWithoutGeo.csv',
  // recordsPerQuery: 100,
  // encoding: 'utf8' default encoding
  // parser: {
  //   delimiter: ',',
  //   quote: '"',
  //   escape: '\\'
  // }
});
