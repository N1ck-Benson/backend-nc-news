const ENV = process.env.NODE_ENV || "development";
const knex = require("knex");
const customConfig =
  ENV === "production"
    ? {
        client: "pg",
        connection: {
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }
    : require("../knexfile");

const dbConnection = knex(customConfig);

module.exports = dbConnection;
