const express = require("express");
const apiRouter = require("./routers/apiRouter.js");
const app = express();
const {
  handleCustomErrors,
  handlePSQLErrors,
  handleServerErrors,
} = require("./errors/index");

app.use(express.json());

app.use("/api", apiRouter);

// does this .all mean the /api sad path test isn't needed?

app.all("/*", (req, res, next) => {
  next({ status: 404, msg: "Not found" });
});

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
