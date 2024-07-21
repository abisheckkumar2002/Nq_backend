const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_name: String,
  category_other_language: String,
  arcronym: String,
  display_on: String,
  back_end: String,
  createdate: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;