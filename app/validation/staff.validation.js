const isEmpty = require("../config/isEmpty");
const staff = require("../models/staff.model");
const validator = require('validator');
const Counter = require("../models/counter.model")
const Joi = require('joi');
const JoiObjectId = require('joi-objectid')(Joi);
const bcrypt = require("bcrypt");
exports.staffValidation = (req, res, next) => {




   reqBody = req.body;




   const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required(),
      contact: Joi.string().required().max(10),
      name: Joi.string().alphanum().min(3).max(30).required(),
      address: Joi.string().required(),
      password: Joi.string().min(8).required(),
      conform_password: Joi.string().valid(Joi.ref('password')).required()
       .messages({ 'any.only': 'Password and confirmation must match', }),
      user_role: JoiObjectId().required(),
      category1_id: Joi.array().items(Joi.string().required()).required(),
      category2_id: Joi.array().items(Joi.string()),
      category3_id: Joi.array().items(Joi.string()),
      notification: Joi.boolean(),


      counter_id: JoiObjectId().custom(async (value, helpers) => {

         const counterExists = await Counter.exists({ _id: value });
         if (!counterExists) {
            console.log("Invalid counter ID")
            return res.status(400).json({ errors: "Invalid counter ID" });

         }

      }),

   }).options({ allowUnknown: true });


   const { error, value } = schema.validate(reqBody, { abortEarly: false, errors: { wrap: { label: '' } } });

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




}