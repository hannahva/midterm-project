exports.seed = function(knex, Promise) {
      return Promise.all([
        knex("markers").del(),
        knex("list_users").del(),
        knex("lists").del(),
        knex("users").del()
      ]);
};
