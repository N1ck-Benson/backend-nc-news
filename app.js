const express = require("express");
const apiRouter = require("./routers/apiRouter.js");
const app = express();

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).send(err.msg);
  }
});

app.use((err, req, res, next) => {
  console.log(err, "<< err in the 500 handler");
});

module.exports = app;
