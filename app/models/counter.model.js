const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  title: String,
  description: String,
  published: Boolean,
  createdate: {
    type: Date,
    default: Date.now,
  },
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;