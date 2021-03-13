exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status === 404) res.status(err.status).send(err.msg);
  if (err.status === 400) res.status(err.status).send(err.msg);
  next(err);
};

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code) {
    if (err.code === "22P02") {
      res.status(400).send("Bad request");
    }
  }
  next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  res.sendStatus(500).send("Internal server error");
};
