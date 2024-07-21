


module.exports = app => {
    const passport = require('passport');

    const controller = require("../controllers/call.controller");


    const passportAuth = passport.authenticate("staffAuth", { session: false });
    var router = require("express").Router();

    router.
        post("/update", passportAuth, controller.create)


    router.
        get("/", passportAuth, controller.matchCall1)


    router.
        post("/status", passportAuth, controller.statusUpdate)


    router.
        post("/transfer", passportAuth, controller.statusUpdate)

    app.use('/api/call', router);


}