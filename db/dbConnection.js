const knex = require("knex");
const customConfig = require("../knexfile");
const dbConnection = knex(customConfig);

module.exports = dbConnection;
