exports.up = function (knex) {
  return knex.schema.createTable("topics", (topicsTable) => {
    topicsTable.string("slug").primary();
    topicsTable.string("description");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("topics");
};
