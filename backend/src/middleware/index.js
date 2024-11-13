require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
// const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const apiSpecPath = path.join(__dirname, "swagger.yml");
const YAML = require("yamljs");

const swaggerDoc = YAML.load(apiSpecPath);
const OpenApiValidator = require("express-openapi-validator");
const swaggerUi = require("swagger-ui-express");
const config = require("../config");

const applyMiddleware = (app) => {
  // app.use(morgan("tiny"));
  // app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // const corsOptions = {
  //   origin: config.corsUrl,
  //   credentials: true,
  //   optionSuccessStatus: 200,
  // };
  app.use(cors());
  // openapi specification middleware
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  app.use(
    OpenApiValidator.middleware({
      apiSpec: apiSpecPath,
      validateRequests: true,
      // validateResponses: true,
      ignorePaths: (path) =>
        path.endsWith("/spec") || path.indexOf("/upload") >= 0,
    }),
  );
  // cors error handle
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );
    next();
  });
};

module.exports = applyMiddleware;
