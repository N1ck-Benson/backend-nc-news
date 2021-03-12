const articlesRouter = require("express").Router();
const { getArticleByArticleId } = require("../controllers/articlesControllers");

articlesRouter.route("/:article_id").get(getArticleByArticleId);

module.exports = articlesRouter;
