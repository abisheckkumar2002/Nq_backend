module.exports = app => {
  const counters = require("../controllers/counter.controller.js");
  const Validation= require("../validation/counter.validation.js")

  var router = require("express").Router();

  
  router.post("/", Validation.CounterValidation ,counters.create);


  router.get("/", counters.findAll);


  router.get("/published", counters.findAllPublished);


  router.get("/:id", counters.findOne);


  router.put("/:id",Validation.CounterValidation, counters.update);


  router.delete("/:id", counters.delete);


  router.delete("/", counters.deleteAll);
  

  app.use('/api/counters', router);
};