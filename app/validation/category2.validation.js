
const Category = require('../models/category.model');
const category2 = require('../models/category2.model')
const Joi = require('joi');
const JoiObjectId = require('joi-objectid')(Joi);

exports.category2 = (req, res, next) => {

   reqBody = req.body


   const schemaa = Joi.object({

      child: Joi.string().required(),
      arcronym: Joi.string().max(5).required(),
      category_other_language: Joi.string().max(30).required(),
      display_on: Joi.string().required(),
      back_end: Joi.string().optional().empty('').trim().disallow(''),
      // category_id: JoiObjectId().custom(async (value) => {

      //    const categoryExists = await Category.exists({ _id: value });
      //    console.log("Category ID", categoryExists)
      //    if (!categoryExists) {
      //       console.log("Category ID")
      //       return res.status(400).json({ errors: "Invalid Category ID" });

      //    }

      // }),
      category_id: JoiObjectId().required(),
   }).options({ allowUnknown: false });


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

      Category.exists({ _id: value.category_id })
         .then(exists => {
            // Use the 'exists' variable here which will contain the result
            // of the existence check (true or false).
            console.log(exists);
            if (exists == null) {
               return res.status(400).json({
                  errors: {
                     category_id: "Invalid Category ID"
                  }
               });

            }
            return next();
         })
         .catch(error => {
            // Handle any errors that occurred during the existence check.
            console.error(error);
         });

      // return next();

   }

}