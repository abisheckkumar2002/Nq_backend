const db = require("../models");
const registerationValidation =require("../validation/registeration.validation")



const Registeration = db.registeration;


exports.create = (req, res) => {
console.log("registerationValidation",req.validatedData)
    const reqBody = req.validatedData;

    const Registerationnew = new Registeration({

        name: reqBody.name,
        email: reqBody.email,
        password: reqBody.password,


    });

    Registerationnew.save().then(
        res.send({
            status: "200",
            message: 'Registeration successfully'
        })
    )





}