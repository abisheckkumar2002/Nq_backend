module.exports = app => {
    const passport = require("passport")
    const staffValidation = require("../validation/staff.validation")
    const staffController = require("../controllers/staff.controller");

    const passportAuth = passport.authenticate("staffAuth", { session: false });
  
    var router = require("express").Router();





    router.post("/", staffValidation.staffValidation, staffController.create);   // create staff

    router.get("/", staffController.findAll);  
    
    router.get("/:id", staffController.findOne);  // get one result

    router.put("/:id",staffValidation.staffValidation, staffController.update);

    router.delete("/:id", staffController.delete);



    app.use('/api/staff', router);

};