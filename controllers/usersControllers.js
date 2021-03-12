const { fetchUserByUsername } = require("../models/usersModels");

exports.getUserByUsername = (req, res, next) => {
  const username = req.params.username;
  fetchUserByUsername(username)
    .then((userArray) => {
      const resObject = {};
      const userObject = userArray[0];
      resObject.user = userObject;
      res.status(200).send(resObject);
    })
    .catch((err) => {
      next(err);
    });
};
