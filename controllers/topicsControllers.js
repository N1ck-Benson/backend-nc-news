const { fetchTopics } = require("../models/topicsModels");

exports.getTopics = (req, res, next) => {
  fetchTopics().then((arrayOfTopics) => {
    const resObj = {};
    resObj.topics = arrayOfTopics;
    res.status(200).send(resObj);
  });
};
