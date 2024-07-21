

const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.counters = require("./counter.model.js");
db.category = require("./category.model.js");
db.category2 = require("./category2.model.js");
db.category3 =require("./category3.model.js");
db.staff = require("./staff.model.js");
db.registeration = require("./registeration.model.js");
db.ticketstatus = require("./ticketstatus.model.js");
db.ticket=require("./ticket.model.js");
db.transferstatus=require("./transferstatus.model.js");
db.skipstatus=require("./skipstatus.model.js");
module.exports = db;