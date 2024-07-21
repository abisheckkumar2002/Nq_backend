
const mongoose = require('mongoose');

const category3shcema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    child_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category2'
    },
    subchild: String,
    category_other_language: String,
    createdate: {
        type: Date,
        default: Date.now,
    },
});

const Category2 = mongoose.model('Category3', category3shcema);

module.exports = Category2;