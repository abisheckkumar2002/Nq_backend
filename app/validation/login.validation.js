
const { isV4Format } = require("ip");
const db = require("../models");
const Registeration = require("../models/registeration.model");
const bcrypt = require("bcrypt");
const Joi = require('joi');

exports.LoginValidation = (req, res, next) => {

    reqBody = req.body;


    const schemaa = Joi.object({

        email: Joi.string().lowercase().email().required(),
        password: Joi.string().min(8).required(),

    })


    const { error, value } = schemaa.validate(reqBody, { abortEarly: false, errors: { wrap: { label: '' } } });

    if (error) {

        const errorDetails = error.details.reduce((accumulator, detail) => {

            accumulator[detail.context.key] = detail.message;

            return accumulator;
        }, {});


        return res.status(400).json({ errors: errorDetails });
    }



    else {

        Registeration.findOne({ email: value.email })

            .then(response => {

                if (response == null) {
                    return res
                        .status(500)
                        .send({ message: "Email is not exists" });
                }
                else {
                    var passwordStatus = bcrypt.compareSync(
                        value.password,
                        response.password
                    );

                    if (!passwordStatus) {

                        return res
                            .status(500)
                            .send({ message: "password is incorrect" });


                    }


                    else {

                        req.validatedData = {
                            ...value,
                            _id: response._id // Include the ObjectId in the validated data
                        };

                        return next();


                    }


                }

            })








        // req.validatedData = value;
        // return next();

    }





}