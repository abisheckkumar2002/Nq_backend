


module.exports = app => {

   
    const loginControler = require("../controllers/login.controller.js");
    const validation = require("../validation/login.validation.js")
    var router = require("express").Router();
    
    router.
        post("/",   loginControler.login)


    app.use('/api/login', router);

}