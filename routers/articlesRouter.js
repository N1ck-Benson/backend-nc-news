const articlesRouter = require("express").Router();
const {
  getArticleByArticleId,
  patchArticleVotes,
  postComment,
} = require("../controllers/articlesControllers");

articlesRouter.route("/:article_id").get(getArticleByArticleId);
articlesRouter.route("/:article_id").patch(patchArticleVotes);
articlesRouter.route("/:artcle_id/comments").post(postComment);

module.exports = articlesRouter;
