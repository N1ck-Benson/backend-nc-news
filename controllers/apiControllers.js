const { fetchAPI } = require("../models/apiModels");

exports.getAPI = (req, res, next) => {
  fetchAPI()
    .then((endpointsJSON) => {
      const parsedJSON = JSON.parse(endpointsJSON);
      res.send(parsedJSON);
    })
    .catch((err) => {
      next(err);
    });
};
