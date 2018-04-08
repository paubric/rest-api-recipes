const express = require('express')
const router = express.Router();

// Handle incoming GET requests to /resource
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /resource'
  });
});

// Handle incoming POST requests to /resource
router.post('/', (req, res, next) => {
  const resourceObject = {
    name: req.body.name
  }
  res.status(201).json({
    message: 'Handling POST requests to /resource',
    createdObject: resourceObject
  });
});

// Handle incoming GET requests to /resource/:resourceID
router.get('/:resourceId', (req, res, next) => {
  const id = req.params.resourceId;
  res.status(200).json({
    message: 'Handling GET requests to /resource/:resourceId',
    id: id
  });
});

// Handle incoming PATCH requests to /resource/:resourceID
router.patch('/:resourceId', (req, res, next) => {
  const id = req.params.resourceId;
  res.status(200).json({
    message: 'Handling PATCH requests to /resource/:resourceId',
    id: id
  });
});

// Handle incoming DELETE requests to /resource/:resourceID
router.delete('/:resourceId', (req, res, next) => {
  const id = req.params.resourceId;
  res.status(200).json({
    message: 'Handling DELETE requests to /resource/:resourceId',
    id: id
  });
});

module.exports = router;
