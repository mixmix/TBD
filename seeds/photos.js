
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('photos').del(),

    // Inserts seed entries
    knex('photos').insert({id: 1, userId: 1, country: 'USA', city: 'Austin', caption: 'I am riding a horse', rating: 100, link: "https://s-media-cache-ak0.pinimg.com/236x/13/4a/78/134a78460defef0bc46ef4bd2174e7f0.jpg", categoryId: 7}),
    knex('photos').insert({id: 2, userId: 1, country: 'NZ', city: 'Wellington', caption: 'Look an albino kiwi!', rating: -56, link: "https://s-media-cache-ak0.pinimg.com/236x/23/34/c1/2334c175f848b17e62cda6d8d4c8ad8b.jpg", categoryId: 1}),
    knex('photos').insert({id: 3, userId: 2, country: 'CN', city: 'Shanghai', caption: 'Just read the docs', rating: 45, link: "http://i.dailymail.co.uk/i/pix/2013/05/09/article-0-19B357D8000005DC-348_634x607.jpg", categoryId: 8})
  );
};
