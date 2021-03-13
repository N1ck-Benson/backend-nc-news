const { request } = require("express");
const { default: knex } = require("knex");
const { patch } = require("../app");
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
  // models inserts article_id, username and body into comments as an array of objects
  // returns the body (as an array containing one object)
  const username = reqBody.username;
  const body = reqBody.body;
  console.log(username, "<< username in model");
  return knex("comments").insert();
};
