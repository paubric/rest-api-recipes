const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

// Connect to MongoDB database with mangoose
dbURI = 'mongodb://hivecluster:hivecluster@hivecluster-shard-00-00-6b8rc.mongodb.net:27017,hivecluster-shard-00-01-6b8rc.mongodb.net:27017,hivecluster-shard-00-02-6b8rc.mongodb.net:27017/test?ssl=true&replicaSet=HiveCluster-shard-0&authSource=admin'
mongoose.connect(dbURI)
  .then(() => {
    console.log("Database connection established!");
  })
  .catch(err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// Enable logging and parsing
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Disable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

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
