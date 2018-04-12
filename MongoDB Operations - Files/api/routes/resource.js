const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Resource  = require('../models/resource_model');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null, true);
  else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4
  },
  fileFilter: fileFilter
})

// Handle incoming GET requests to /resource, show all Resource objects
router.get('/', (req, res, next) => {
  Resource.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        objects: docs.map(doc => {
          return {
            _id: doc._id,
            data: doc.data,
            resourceImage: doc.resourceImage,
            requests: {
              type: 'GET',
              url: 'http://localhost:3000/resource/' + doc._id
            }
          }
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
    });
});

// Handle incoming POST requests to /resource, add new Resource object
router.post('/', upload.single('resourceImage'), (req, res, next) => {
  console.log(req.file.path);
  const resource = new Resource({
    _id: new mongoose.Types.ObjectId(),
    data: req.body.data,
    resourceImage: req.file.path
  });
  resource.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Created product successfully',
      createdResource: {
        _id: result._id,
        data: result.data,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/resource/' + result._id
        }
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

// Handle incoming GET requests to /resource/:resourceID, show a Resource object by ID
router.get('/:resourceID', (req, res, next) => {
  const id = req.params.resourceID;
  Resource.findById(id)
    .select('_id data resourceImage')
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          resource: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/resource'
          }
        });
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
      res.status(200).json({
        message: 'Resource updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/resource/' + id
        }
      });
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
      res.status(200).json({
        message: 'Product deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/resource/',
          data: { name: 'String', price: 'Number' }
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

module.exports = router;
