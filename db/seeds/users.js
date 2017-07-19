exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice', email: 'alice@alice.com', password: '1234'}),
        knex('users').insert({id: 2, name: 'Bob', email: 'bob@bob.com', password: '2345'}),
        knex('users').insert({id: 3, name: 'Charlie', email: 'charlie@charlie.com', password: '3456'})
      ]);
    });
};
