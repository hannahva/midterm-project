exports.seed = function(knex, Promise) {
      return Promise.all([
        knex("markers").del(),
        knex("contributions").del(),
        knex("favourites").del(),
        knex("lists").del(),
        knex("users").del()
      ]);
};
