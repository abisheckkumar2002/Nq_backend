

const Staff =require("../models/staff.model")

const JwtStrategy = require("passport-jwt").Strategy, ExtractJwt = require("passport-jwt").ExtractJwt;

//import function

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "test";

//import model



// Remove the export keyword
exports .staffAuth = (passport) => {
  passport.use(
    "staffAuth",
    new JwtStrategy(opts, async function (jwt_payload, done) {

      // console.log(jwt_payload,'jwt_payload');
      Staff.findById(jwt_payload._id, function (err, staff) {
       // console.log("staffAuth", jwt_payload);

        if (err) {
          return done(err, false);
        } else if (staff) {

          console.log('staff' ,staff);
          let data = {
            id: staff._id,
            name: staff.name,
            role: staff.user_role,
            category1: staff.category1_id,
            category2: staff.category2_id,
            category3: staff.category3_id,
            counter: staff.counter_id,
            
          };
         // console.log('ddddd');
          return done(null, data);
        }
        return done(null, false);

        
      });
    })
  );
};

// Make the staffAuth function available globally or attach it to an existing object
// Example for browser environment
