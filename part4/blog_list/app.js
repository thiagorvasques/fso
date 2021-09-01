const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogsRoute = require("./controllers/blogs");
const loginRoute = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const usersRoute = require("./controllers/users");
logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to mongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });
app.use(middleware.tokenExtractor);
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/login", loginRoute);
app.use("/api/users", usersRoute);
app.use("/api/blogs", middleware.useExtractor, blogsRoute);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
