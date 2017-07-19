
exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable("list_users", (table) => {
    table.integer("list_id")
    .references("id").inTable("lists");
    table.integer("user_id")
    .references("id").inTable("users");
  })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.dropTable("list_users")
  ]);
};
