const mongoose = require('mongoose');

// Resource model schema
const resourceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  data: String
});

module.exports = mongoose.model('Resource', resourceSchema);
