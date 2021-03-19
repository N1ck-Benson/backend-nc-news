const fs = require("fs");

exports.fetchAPI = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./endpoints.json", "utf8", (err, endpointsJSON) => {
      if (err) reject(err);
      else resolve(endpointsJSON);
    });
  });
};
