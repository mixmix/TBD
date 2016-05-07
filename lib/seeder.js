var seeder = require('knex-csv-seeder');

// console.log(Object.keys(seeder.seeder.seed))

var output = seeder.seeder.seed({
  table: 'cities',
  file: '../datasets/countries.csv',
  // recordsPerQuery: 100,
  encoding: 'utf8',
  parser: {
    delimiter: ',',
    quote: '"',
    escape: '\\'
  }
});

console.log(output())
