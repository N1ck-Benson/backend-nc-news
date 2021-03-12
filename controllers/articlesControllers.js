const { patch } = require("../app");
const {
  fetchArticleByArticleId,
  updateArticleVotes,
} = require("../models/articlesModels");

exports.getArticleByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  fetchArticleByArticleId(articleId)
    .then((arrayFromModel) => {
      const resObject = {};
      const objectFromModel = arrayFromModel[0];
      resObject.article = objectFromModel;
      // NB: 'count' property on articleObject needs changing ->
      const count = parseFloat(resObject.article.count);
      delete resObject.article.count;
      resObject.article.comment_count = count;
      res.status(200).send(resObject);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleVotes = (req, res, next) => {
  const articleId = req.params.article_id;
  const patchByAmount = req.body.inc_votes;
  updateArticleVotes(articleId, patchByAmount).then((updatedArticle) => {
    console.log(updatedArticle, "<< updatedArticle in controller");
  });
};
