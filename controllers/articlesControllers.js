const { fetchArticleByArticleId } = require("../models/articlesModels");

exports.getArticleByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  fetchArticleByArticleId(articleId).then((resFromModel) => {
    console.log(resFromModel);
  });
};
