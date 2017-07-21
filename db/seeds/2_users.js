exports.seed = function(knex, Promise) {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice', email: 'alice@alice.com', password: 1234}),
        knex('users').insert({id: 2, name: 'Bob', email: 'bob@bob.com', password: 1234}),
        knex('users').insert({id: 3, name: 'Charlie', email: 'charlie@charlie.com', password: 1234})
      ])
      .then(function(){
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users)+1)");
      })
};
