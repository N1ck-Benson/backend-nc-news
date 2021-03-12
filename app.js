const express = require("express");
const apiRouter = require("./routers/apiRouter.js");
const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  next({ status: 404, msg: "Not found" });
});

// Handle custom error codes
app.use((err, req, res, next) => {
  if (err.status === 404) res.status(err.status).send(err.msg);
  if (err.status === 400) res.status(err.status).send(err.msg);
  next(err);
});

// Handle psql error codes
app.use((err, req, res, next) => {
  if (err.code) {
    if (err.code === "22P02") {
      res.status(400).send("Bad request");
    }
  }
  next(err);
});

// Handler for uncaught 500s
app.use((err, req, res, next) => {
  res.sendStatus(500).send("Internal server error");
});

module.exports = app;
