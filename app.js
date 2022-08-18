"use strict";

const express = require("express");

const itemRoutes = require("./items.js")
const { NotFoundError } = require("./expressError.js");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use('/items', itemRoutes);
app.use(morgan('dev'));
/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  console.log("in 404 use")
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
    console.log('hi')
    const status = err.status || 500;
    const message = err.message;
    if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
    return res.status(status).json({ error: { message, status } });
  });
  
  
  
  module.exports = app;