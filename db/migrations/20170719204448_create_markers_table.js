
exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable("markers", (table) => {
    table.increments();
    table.string("title");
    table.string("description");
    table.string("icon");
    table.float("lat", 14, 10).notNullable();
    table.float("lng", 14, 10).notNullable();
    table.string("picture");
    table.integer("list_id")
    .references("id").inTable("lists");
    table.integer("user_id")
    .references("id").inTable("users");
    table.timestamps();
  })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.dropTable("markers")
  ]);
};
