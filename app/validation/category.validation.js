
const Category = require('../models/category.model');
const Joi = require('joi');

exports.CategoryValidation = (req, res, next) => {


   reqBody = req.body;

   const schemaa = Joi.object({
      category_name: Joi.string().min(3).max(30).required(),
      arcronym: Joi.string().required(),
      display_on: Joi.string().max(30).required(),
      back_end: Joi.string().required(),
      category_other_language: Joi.string().optional().empty('').trim().disallow('')
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

      Category.findOne({ category_name: value.category_name })
         .then(response => {
            console.log("ress", response)
            if (response == null) {

               return next();

            } else {

               const objectIdInstance = response._id;
               const idString = objectIdInstance.toString();

               console.log(idString);


               console.log(req.params.id, "req.params.id");
               if ((req.params.id != idString) || (req.params.id == undefined)) {

                  return res.status(400).json({
                     errors: {
                        "category_name": "Category name already exists"
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










