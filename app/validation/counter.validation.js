const Counter = require("../models/counter.model");
const Joi = require('joi');



exports.CounterValidation = (req, res, next) => {


    reqBody = req.body;

    const schemaa = Joi.object({
        title: Joi.string().min(3).max(30).required(),
        description: Joi.string().min(3).max(100),
        published: Joi.boolean().default(false),

    })

    const { error, value } = schemaa.validate(reqBody, { abortEarly: false, errors: { wrap: { label: '' } } });



    if (error) {

        const errorDetails = error.details.reduce((accumulator, detail) => {
            accumulator[detail.context.key] = detail.message;
            return accumulator;
        }, {});

        console.log('Validation error:');
        console.log(errorDetails);

        return res.status(400).json({ errors: errorDetails });
    }



    else {

        console.log(value, "value");

        Counter.findOne({ title: value.title })
            .then(response => {
                console.log("ress", response)
                if (response == null) {

                    return next();

                } else {



                    const objectIdInstance = response._id;

                    const idString = objectIdInstance.toString();

                    console.log(req.params.id, "req.params.id");
                    console.log(idString);
                    
                    if ((req.params.id != idString) || (req.params.id == undefined)) {

                        return res.status(400).json({
                            errors: {
                                "title": "title name already exists"
                            }
                        });

                    }
                    else {
                        return next();

                    }
                }

            })


    }




}