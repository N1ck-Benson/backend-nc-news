const dbConnection = require("../db/dbConnection");

exports.fetchArticles = (query) => {
  const sortBy = query.sort_by || "created_at";
  const order = query.order || "desc";
  return dbConnection
    .select("articles.*")
    .count("comments")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sortBy, order)
    .then((outputArray) => {
      // send an error code if order is not asc/desc
      if (!["asc", "desc"].includes(order)) {
        return Promise.reject({
          code: "42703",
        });
      }
      // filter if this is required by the query
      if (query.filter) {
        const filterBy = Object.keys(query.filter).join();
        const lookFor = query.filter[filterBy];
        if (["author", "topic"].includes(filterBy)) {
          const filteredOutput = outputArray.filter((article) => {
            return article[filterBy] === lookFor;
          });
          return filteredOutput;
        } else {
          return Promise.reject({
            code: "42703",
          });
        }
      }
      return outputArray;
    });
};

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
    .insert({ article_id: articleId, author: username, body: body }, ["*"])
    .then((outputArray) => {
      if (!outputArray[0].body) {
        if (!Object.keys(reqBody).length) {
          return Promise.reject({
            status: 400,
            msg: "Request is missing required fields",
          });
        } 
        // if the test below failed, we wouldn't have got this far
        // this should also already be caught in teh controller
        else if (
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
    .orderBy(sortBy, order)
    .then((outputArray) => {
      if (!["asc", "desc"].includes(order)) {
        return Promise.reject({
          code: "42703",
        });
      } else {
        return outputArray;
      }
    });
};
