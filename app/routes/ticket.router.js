module.exports = app => {
    const Validation = require("../validation/ticket.validation.js");
    const Controller = require("../controllers/ticket.controller.js");


    var router = require("express").Router();

    router.post("/", 
    Validation.ticketValidation, Controller.create); 
      // create staff
    router.get("/", 
     Controller.findAll);

    router.get("/:id",Controller.findOne)
    
    app.use('/api/ticket', router);
};