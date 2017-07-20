exports.seed = function(knex, Promise) {
  console.log("We're seeding users");
  return knex('users')
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice', email: 'alice@alice.com', password: 1234}),
        knex('users').insert({id: 2, name: 'Bob', email: 'bob@bob.com', password: 1234}),
        knex('users').insert({id: 3, name: 'Charlie', email: 'charlie@charlie.com', password: 1234})
      ]);
    });
};
