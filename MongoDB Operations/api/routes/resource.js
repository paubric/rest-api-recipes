const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Resource  = require('../models/resource_model');

// Handle incoming GET requests to /resource, show all Resource objects
router.get('/', (req, res, next) => {
  Resource.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
    });
});

// Handle incoming POST requests to /resource, add new Resource object
router.post('/', (req, res, next) => {
  const resource = new Resource({
    _id: new mongoose.Types.ObjectId(),
    data: req.body.data
  });
  resource.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests to /resource',
      createdResource: result
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

// Handle incoming GET requests to /resource/:resourceID, show a Resource object by ID
router.get('/:resourceID', (req, res, next) => {
  const id = req.params.resourceID;
  Resource.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({message: "No valid entry found for provided ID"})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

// Handle incoming PATCH requests to /resource/:resourceID, modify a Resource object by ID
// [{"propName": "data", "value": "my new data"}]
router.patch('/:resourceID', (req, res, next) => {
  const id = req.params.resourceID;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Resource.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

// Handle incoming DELETE requests to /resource/:resourceID, delete a Resource object by ID
router.delete('/:resourceID', (req, res, next) => {
  const id = req.params.resourceID;
  Resource.remove({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
    });
  });
});

module.exports = router;
