const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Resource = require('../models/resource_model');
const Parent = require('../models/parent_model');

// Handle incoming GET requests to /orders
router.get('/', (req, res, next) => {
  Parent.find()
    .select('resource _id')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        parents: docs.map(doc => {
          return {
            _id: doc._id,
            resource: doc.resource,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/parent/' + doc._id
            }
          }
      })
    })
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  Resource.findById(req.body.resourceId)
    .then(resource => {
      if (!resource) {
        return res.status(404).json({
          message: 'Resource not found'
        });
      }
      const parent = new Parent({
        _id: mongoose.Types.ObjectId(),
        resource: req.body.resourceId
      });
      return parent.save()
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Parent stored',
        createdParent: {
          _id: result._id,
          resource: result.resource
        },
        request: {
          type: 'GET',
          url: 'http://localhost:3000/parent/' + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:parentId', (req, res, next) => {
  Parent.findById(req.params.parentId)
    .select('_id resource')
    .exec()
    .then(parent => {
      if (!parent) {
        return res.status(404).json({
          message: 'Parent not found'
        });
      }
      res.status(200).json({
        parent: parent,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/parent'
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
});

router.delete('/:parentId', (req, res, next) => {
  Parent.remove({ _id: req.params.parentId })
    .exec()
    .then(order => {
      res.status(200).json({
        message: 'Parent deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/parentId',
          body: { resourceId: "ID" }
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
