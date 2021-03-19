const dbConnection = require("../db/dbConnection");

exports.removeComment = (commentId) => {
  return dbConnection("comments")
    .where("comments.comment_id", "=", commentId)
    .del()
    .then((numberRowsRemoved) => {
      if (!numberRowsRemoved) {
        return Promise.reject({
          code: "23503",
        });
      }
      return numberRowsRemoved;
    });
};
