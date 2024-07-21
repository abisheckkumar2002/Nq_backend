
const mongoose = require('mongoose');

const category2shcema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    child: String,
    category_other_language:String,
    arcronym: String,
    display_on: String,
    back_end: String,
    createdate: {
        type: Date,
        default: Date.now,
    },
});

const Category2 = mongoose.model('Category2', category2shcema);

module.exports = Category2;