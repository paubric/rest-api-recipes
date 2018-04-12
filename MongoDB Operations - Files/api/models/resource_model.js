const mongoose = require('mongoose');

// Resource model schema
const resourceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  data: { type: String, required: true },
  resourceImage: { type: String, required: true }
});

module.exports = mongoose.model('Resource', resourceSchema);
