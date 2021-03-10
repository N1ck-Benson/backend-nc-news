exports.up = function (knex) {
  console.log("creating users table");
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.string("username").primary();
    usersTable.string("avatar_url");
    usersTable.string("name");
  });
};

exports.down = function (knex) {
  console.log("removing user table");
  return knex.schema.dropTable("users");
};
