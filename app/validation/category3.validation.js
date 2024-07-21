
const Category2 = require('../models/category2.model')
const Category = require('../models/category.model')
const Joi = require('joi');
const JoiObjectId = require('joi-objectid')(Joi);

exports.category3 = (req, res, next) => {

   reqBody = req.body


   const schemaa = Joi.object({

      subchild: Joi.string().required(),

      category_other_language: Joi.string().max(30).required(),
      child_id: JoiObjectId(),

      category_id: JoiObjectId()


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


      const checkCategoryExists = Category.exists({ _id: value.category_id });
      const checkChildExists = Category2.exists({ _id: value.child_id });

      Promise.all([checkCategoryExists, checkChildExists])
         .then(([categoryExists, childExists]) => {
            if (categoryExists == null) {
               console.log('category', categoryExists);
               return res.status(400).json({
                  errors: {
                     category_id: "Invalid Category ID"
                  }
               });
            }

            if (childExists == null) {
               console.log('childExists', childExists);
               return res.status(400).json({
                  errors: {
                     child_id: "Invalid Child ID"
                  }
               });
            }


            return next();
         })
         .catch(error => {
            // Handle any errors that occurred during the existence check.
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
         });

   }
}