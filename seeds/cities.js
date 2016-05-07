
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('cities').del(),

    // Inserts seed entries
    knex('cities').insert({id: 1, name: 'Austin', count: 9}),
    knex('cities').insert({id: 2, name: 'Wellington', count: 8}),
    knex('cities').insert({id: 3, name: 'Auckland', count: 7}),
    knex('cities').insert({id: 4, name: 'San Francisco', count: 6}),
    knex('cities').insert({id: 5, name: 'Los Angeles', count: 5}),
    knex('cities').insert({id: 6, name: 'Tokyo', count: 4}),
    knex('cities').insert({id: 7, name: 'Christchurch', count: 3}),
    knex('cities').insert({id: 8, name: 'Melbourne', count: 0})
  );
};
