const dbConnection = require("../db/dbConnection");

exports.fetchArticleByArticleId = (articleId) => {
  return dbConnection
    .select("articles.*")
    .count("comments")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", articleId)
    .then((arrayFromModel) => {
      if (!arrayFromModel[0]) {
        if (parseFloat(articleId)) {
          return Promise.reject({
            status: 404,
            msg: "Not found",
          });
        }
        return Promise.reject({
          status: 400,
          msg: "Bad request",
        });
      }
      return arrayFromModel;
    });
};

exports.updateArticleVotes = (articleId, patchByAmount) => {
  return dbConnection
    .select("votes")
    .from("articles")
    .where("article_id", "=", articleId)
    .then((outputArray) => {
      if (!outputArray[0]) {
        if (parseFloat(articleId)) {
          return Promise.reject({
            status: 404,
            msg: "Not found",
          });
        }
        return Promise.reject({
          status: 400,
          msg: "Bad request",
        });
      }
      let newVotes = outputArray[0].votes;
      newVotes += patchByAmount;
      return newVotes;
    })
    .then((newVotes) => {
      return dbConnection("articles")
        .where("article_id", "=", articleId)
        .update({
          votes: newVotes,
        })
        .returning("*");
    });
};

exports.addComment = (articleId, reqBody) => {
  const username = reqBody.username;
  const body = reqBody.body;
  return dbConnection("comments")
    .insert([{ article_id: articleId, author: username, body: body }], ["body"])
    .then((outputArray) => {
      if (!outputArray[0].body) {
        if (!Object.keys(reqBody).length) {
          return Promise.reject({
            status: 400,
            msg: "Request is missing required fields",
          });
        } else if (
          !Object.keys(reqBody).some((key) => {
            return ["article_id", "author", "body"].includes(key);
          })
        ) {
          return Promise.reject({
            status: 400,
            msg: "Request fields are invalid",
          });
        }
      }
      return outputArray;
    });
};

exports.fetchCommentByArticleId = (articleId, query) => {
  const sortBy = query.sort_by || "created_at";
  const order = query.order || "desc";
  return dbConnection
    .select("author", "comment_id", "votes", "created_at", "body")
    .from("comments")
    .where("article_id", "=", articleId)
    .orderBy(sortBy, order);
};
