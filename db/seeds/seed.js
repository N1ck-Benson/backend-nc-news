const {
  topicsData,
  articlesData,
  commentsData,
  usersData,
} = require("../data/index.js");
const { changeKey } = require("../utils/changeKey.js");

const { createRefObj, formatData } = require("../utils/data-manipulation.js");
const { formatComments } = require("../utils/formatComments.js");
const { updateCreatedAt } = require("../utils/updateCreatedAt.js");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics").insert(topicsData).returning("*");
    })
    .then(() => {
      return knex("users").insert(usersData).returning("*");
    })
    .then(() => {
      const formattedArticlesData = updateCreatedAt(articlesData);
      return knex("articles").insert(formattedArticlesData).returning("*");
    })
    .then((finishedArticles) => {
      const refObj = createRefObj(finishedArticles, "title", "article_id");
      const commentsWithId = formatComments(commentsData, refObj);
      const formattedCommentsData = changeKey(
        commentsWithId,
        "created_by",
        "author",
        "belongs_to"
      );
      const reformattedCommentsData = updateCreatedAt(formattedCommentsData);
      return knex("comments").insert(reformattedCommentsData).returning("*");
    });
};
