const express = require('express');
const app = express();

// Routes which should handle requests
const resourceRoutes = require('./api/routes/resource');
app.use('/resource', resourceRoutes);

module.exports = app;
