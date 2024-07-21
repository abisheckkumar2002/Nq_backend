module.exports = app => {
  const category = require("../controllers/category.controller.js");
  const Category_Validation = require("../validation/category.validation.js");
  const passport =require("passport")

  const passportAuth = passport.authenticate("staffAuth", { session: false });

  var router = require("express").Router();

 
 router.post("/",Category_Validation.CategoryValidation, category.create);

 
 router.get("/", category.findAll);




 router.get("/:id", category.findOne);


 router.put("/:id", Category_Validation.CategoryValidation,category.update);

 router.delete("/:id", category.delete); 


 router.delete("/", category.deleteAll);


  app.use('/api/category', router);
};