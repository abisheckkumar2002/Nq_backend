const express = require("express");
const cors = require("cors");
const passport = require("passport")
const app = express();

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


var corsOptions = {
  origin: "http://localhost:8081"
};

//app.use(cors(corsOptions));




app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");


  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());
app.use(passport.initialize());   // use the passport to the express
app.use(express.urlencoded({ extended: true }));


//include the passport

require("./app/config/passport").staffAuth(passport)



app.get("/", (req, res) => {
  res.json({ message: "Welcome to next our application." });
});



//include the routers
require("./app/routes/counter.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/category2.route")(app);
require("./app/routes/category3.router")(app);
require("./app/routes/staff.route")(app);
require("./app/routes/registeration.route")(app);
require("./app/routes/login.routes")(app);

require("./app/routes/ticket.router")(app);
require("./app/routes/call.routers")(app);


// set port, listen for requests
const PORT = process.env.PORT || 5570;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});