const Joi = require('joi');
const Ticket = require('../models/ticket.model')

const JoiObjectId = require('joi-objectid')(Joi);
exports.ticketValidation = (req, res, next) => {

    reqBody = req.body
    console.log('ddddddddddddddddddddddddddd')

    const schemaa = Joi.object({
        category_id: JoiObjectId().required(),
       name: Joi.string().max(20),
        mobile: Joi.number(),


 

    }).options({ allowUnknown: true });


    const { error, value } = schemaa.validate(reqBody, { abortEarly: false, errors: { wrap: { label: '' } } });

    console.log('ddddddddddddddddddddddddddd')

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

        return next();
    }


};