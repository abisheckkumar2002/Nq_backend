const Registeration = require('../models/registeration.model');
const Joi = require('joi');
const hashpassword = require('../library/bycrypt')

const bcrypt = require("bcrypt");



exports.registertionValidation = (req, res, next) => {


    reqBody = req.body;

    const schemaa = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().lowercase().email().required(),
    
        password: Joi.string().min(8).required().custom((value, helpers) => {
            // Use bcrypt to hash the password
            const hashedPassword = bcrypt.hashSync(value, 10);
            return hashedPassword;
        }),
    })

    const { error, value } = schemaa.validate(reqBody, { abortEarly: false, errors: { wrap: { label: '' } } });


    if (error) {

        const errorDetails = error.details.reduce((accumulator, detail) => {

            accumulator[detail.context.key] = detail.message;

            return accumulator;
        }, {});

        console.log(errorDetails);

        return res.status(400).json({ errors: errorDetails });
    }



    else {
        console.log('valuer:', value);
 
        req.validatedData = value;
     
        return next();
    }
}

 