const { removeComment } = require("../models/commentsModels");

exports.deleteComment = (req, res, next) => {
  const commentId = req.params.comment_id;
  removeComment(commentId)
    .then(() => {
      res.status(204).send("");
    })
    .catch((err) => {
      next(err);
    });
};
