exports.handleCustomErrors = (err, req, res, next) => {
  if ([404, 400].includes(err.status)) res.status(err.status).send(err.msg);
  next(err);
};

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code) {
    if (err.code === "22P02") {
      res.status(400).send("Bad request");
    }
    if (err.code === "42703") {
      res.status(400).send("Query contains invalid criteria");
    }
    if (err.code === "23503") {
      res.status(404).send("Not found");
    }
  }
  next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  res.sendStatus(500).send("Internal server error");
};
