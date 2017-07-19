exports.seed = function(knex, Promise) {
  console.log("We're seeing users");
  return knex('list_users').del()
    .then(function () {
      return Promise.all([
        knex('list_users').insert({list_id: 1, user_id: 1}),
        knex('list_users').insert({list_id: 2, user_id: 2}),
        knex('list_users').insert({list_id: 3, user_id: 3})
      ]);
    });
};
