const articlesRouter = require("express").Router();
const {
  getArticleByArticleId,
  patchArticleVotes,
} = require("../controllers/articlesControllers");

articlesRouter.route("/:article_id").get(getArticleByArticleId);
articlesRouter.route("/:article_id").patch(patchArticleVotes);

module.exports = articlesRouter;
