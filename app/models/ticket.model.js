const { string } = require('joi');
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

    child_id: {
        type: String,
        ref: 'Category2'
    },

    subchild_id: {
        type: String,
        ref: 'Category3',
    },

    ticket_no: {

        type: String,
        unique: true,
    },

    name: String,
    mobile: Number,

    createdate: {
        type: Date,
        default: Date.now,
    },
    // status: {
    //     type: String,
    //     default: "Waiting"
    // },

});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;