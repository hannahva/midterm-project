exports.seed = function(knex, Promise) {
      return Promise.all([
        knex("markers").del(),
        knex("lists").del(),
        knex("users").del()
      ]);
};
