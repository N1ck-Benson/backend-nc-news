const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleByArticleId,
  patchArticleVotes,
  postComment,
  getCommentByArticleId,
} = require("../controllers/articlesControllers");

articlesRouter.route("").get(getArticles);
articlesRouter.route("/:article_id").get(getArticleByArticleId);
articlesRouter.route("/:article_id").patch(patchArticleVotes);
articlesRouter.route("/:article_id/comments").post(postComment);
articlesRouter.route("/:article_id/comments").get(getCommentByArticleId);

module.exports = articlesRouter;
