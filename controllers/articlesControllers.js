const {
  fetchArticles,
  fetchArticleByArticleId,
  updateArticleVotes,
  addComment,
  fetchCommentByArticleId,
} = require("../models/articlesModels");

exports.getArticles = (req, res, next) => {
  const query = req.query;
  fetchArticles(query)
    .then((arrayFromModel) => {
      const articlesObject = {};
      articlesObject.articles = arrayFromModel;
      // change key-name and datatype of article.count
      articlesObject.articles.map((article) => {
        const count = parseFloat(article.count);
        delete article.count;
        article.comment_count = count;
      });
      res.status(200).send(articlesObject);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  fetchArticleByArticleId(articleId)
    .then((arrayFromModel) => {
      const articleObject = {};
      const objectFromModel = arrayFromModel[0];
      articleObject.article = objectFromModel;
      // 'count' property on articleObject needs changing ->
      const count = parseFloat(articleObject.article.count);
      delete articleObject.article.count;
      articleObject.article.comment_count = count;
      res.status(200).send(articleObject);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleVotes = (req, res, next) => {
  const articleId = req.params.article_id;
  const patchByAmount = req.body.inc_votes;
  updateArticleVotes(articleId, patchByAmount)
    .then((updatedArticle) => {
      const patchedArticle = {
        article: updatedArticle[0],
      };
      res.status(200).send(patchedArticle);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  const { query } = req;
  fetchCommentByArticleId(articleId, query)
    .then((arrayFromModel) => {
      const commentObject = {};
      commentObject.comments = arrayFromModel;
      res.status(200).send(commentObject);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const articleId = req.params.article_id;
  const reqBody = req.body;
  addComment(articleId, reqBody)
    .then((response) => {
      const postedComment = {};
      postedComment.comment = response[0];
      res.status(201).send(postedComment);
    })
    .catch((err) => {
      next(err);
    });
};
