const dbConnection = require("../db/dbConnection");

exports.fetchUserByUsername = (username) => {
  return dbConnection
    .select("username", "avatar_url", "name")
    .from("users")
    .where("username", "=", username)
    .then((userArray) => {
      const resObj = {};
      resObj.user = userArray[0];
      if (!resObj.user) {
        return Promise.reject({
          status: 404,
          msg: `Found no user with username ${username}`,
        });
      } else {
        return resObj;
      }
    });
};
