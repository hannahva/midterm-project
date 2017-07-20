exports.seed = function(knex, Promise) {
  return knex('favourites')
    .then(function () {
      return Promise.all([
        knex('favourites').insert({list_id: 1, user_id: 1}),
        knex('favourites').insert({list_id: 2, user_id: 2}),
        knex('favourites').insert({list_id: 3, user_id: 3})
      ]);
    });
};

