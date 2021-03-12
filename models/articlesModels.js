const dbConnection = require("../db/dbConnection");

exports.fetchArticleByArticleId = (articleId) => {
  return dbConnection
    .select("*")
    .from("articles")
    .count({ comment_count: "comments.comment_id" })
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", articleId);
};
