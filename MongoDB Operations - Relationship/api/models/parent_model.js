const mongoose = require('mongoose');

// Resource model schema
const parentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  resource: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true},
});

module.exports = mongoose.model('Parent', parentSchema);
