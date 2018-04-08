const express = require('express');
const app = express();

// Enable Morgan logging
const morgan = require('morgan');
app.use(morgan('dev'));

// Routes which should handle requests
const resourceRoutes = require('./api/routes/resource');
app.use('/resource', resourceRoutes);

// Handle not found
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Handle thrown errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
