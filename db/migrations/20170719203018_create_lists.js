
exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable("lists", (table) => {
    table.increments();
    table.string("name");
    table.string("description");
    table.timestamps();
  })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.dropTable("lists")
  ]);
};
