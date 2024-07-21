const mongoose = require('mongoose');
const registertionSchema = new mongoose.Schema({



    name: String,
    email: String,
    password: String,
    createdate: {
        type: Date,
        default: Date.now,
    },
});


const Registeration = mongoose.model('Registration',registertionSchema);

module.exports= Registeration;