module.exports = app => {

    const registertion = require("../controllers/registeration.controller");
    const registerationValidation =require("../validation/registeration.validation")
//  const bycryptPassword =require("")

    var router = require("express").Router();


    router.post("/",registerationValidation.registertionValidation, registertion.create);


    app.use('/api/registertion', router);

}