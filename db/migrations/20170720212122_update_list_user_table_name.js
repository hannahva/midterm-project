
exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.renameTable('list_users', 'contributions')
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.renameTable('contributions', 'list_users')
  ]);
};
