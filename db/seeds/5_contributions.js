exports.seed = function(knex, Promise) {
  return knex('contributions')
    .then(function () {
      return Promise.all([
        knex('contributions').insert({list_id: 1, user_id: 1}),
        knex('contributions').insert({list_id: 2, user_id: 2}),
        knex('contributions').insert({list_id: 3, user_id: 3})
      ]);
    });
};
