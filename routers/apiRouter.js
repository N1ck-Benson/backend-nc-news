const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter.js");
const usersRouter = require("./usersRouter.js");
const articlesRouter = require("./articlesRouter");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);

// Unsure how I would implement a 404 handler in here, i.e. for when the client requests /api/non-existent-endpoint

module.exports = apiRouter;
