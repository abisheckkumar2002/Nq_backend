const mongoose = require('mongoose');

const skipSchema = new mongoose.Schema({

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

const Skip = mongoose.model('Skip', skipSchema);

module.exports = Skip;