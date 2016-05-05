exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('votes').del(),

    // Inserts seed entries
    knex('votes').insert({id: 1, vote: 1, userId: 1, photoId: 1}),
    knex('votes').insert({id: 2, vote: 1, userId: 1, photoId: 2}),
    knex('votes').insert({id: 3, vote: 1, userId: 1, photoId: 3})

  );
};
// table.increments();
// table.integer('vote');
// table.integer('userId');
// table.integer('photoId');
// table.timestamps();
