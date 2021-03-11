const { res } = require("../app");
const { fetchTopics } = require("../models/topicsModels");

exports.getTopics = (req, res, next) => {
  fetchTopics(req).then((topics) => {
    res.status(200).send(topics);
  });
};
