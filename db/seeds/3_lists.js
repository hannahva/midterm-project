
exports.seed = function(knex, Promise) {
  console.log("We're seeing lists");
  return knex('lists')
    .then(function () {
       return Promise.all([
        knex('lists').insert({id: 1, name: 'Yummy Cafes', description: 'Amazing, Local Cafes'}),
        knex('lists').insert({id: 2, name: 'Best Hiking trails', description: 'Best hiking trails in town!'}),
        knex('lists').insert({id: 3, name: 'Beaches', description: 'Great places to swim!'})
      ]);
    });
};

