module.exports = app => {
  const validation = require("../validation/category2.validation")
  const Controller = require("../controllers/category2.controller");


  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/",
  validation.category2,
  Controller.create);

 // Retrieve all counters
  router.get("/", Controller.findAll);



  // // Retrieve a single Tutorial with id
  // router.get("/:id", category2.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", category2.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", level2category.delete);

  // // Delete all counters
  // router.delete("/", category2.deleteAll);

  app.use('/api/category2', router);
};