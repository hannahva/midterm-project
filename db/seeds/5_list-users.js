exports.seed = function(knex, Promise) {
  console.log("We're seeding users");
  return knex('list_users')
    .then(function () {
      return Promise.all([
        knex('list_users').insert({list_id: 1, user_id: 1}),
        knex('list_users').insert({list_id: 2, user_id: 2}),
        knex('list_users').insert({list_id: 3, user_id: 3})
      ]);
    });
};
