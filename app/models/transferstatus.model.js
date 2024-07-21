const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({

    Staff_id: mongoose.Schema.Types.ObjectId,

    Ticket_id: mongoose.Schema.Types.ObjectId,

    status: {
        type: String,
       
    },
    createdate: {
        type: Date,
        default: Date.now,
    },
});

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;