const ENV = process.env.NODE_ENV || "development";

const testData = require("./test-data");
const developmentData = require("./development-data");

// NB: if there's an issue in this file, check whether the requires above need destructuring

const data = {
  development: developmentData,
  test: testData,
};

module.exports = data[ENV];
