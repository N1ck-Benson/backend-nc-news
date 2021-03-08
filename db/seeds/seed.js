const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topic").insert(topicData).returning("*");
    });
  /*
    ISSUE: 
    we did npm run seed, and got an error
    problem seems to be in the rollback/latest process, but not sure
    */
};
