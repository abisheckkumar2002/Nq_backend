
const db = require("../models");

const Registeration = db.registeration;
const Staff = db.staff
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const loginValidation = require("../validation/login.validation");

exports.login = async (req, res) => {





  try {
    let reqBody = req.body,
      checkUser;
    reqBody.email = reqBody.email.toLowerCase();
    checkUser = await Staff .findOne({ email: reqBody.email });
    if (!checkUser) {
      console.log("Email")
      return res
        .status(400)
        .json({ success: false, errors: { email: "Email is not exists" } });
    }

    // var passwordStatus = bcrypt.compareSync(
    //   reqBody.password,
    //   checkUser.password
    // );

    // if (!passwordStatus) {
    //   console.log("Password")
    //   return res
    //     .status(400)
    //     .json({ success: false, errors: { password: "Invalid Password" } });
    // }

    let payloadData = {
      _id: checkUser._id,
    };
    let token = new Staff().generateJWT(payloadData);
    let data = {
      _id: checkUser._id,
      email: checkUser.email,
      name: checkUser.name,
    };

    return res
      .status(200)
      .json({ success: true, 
        message: "Login successfully", 
        token,
         data });
         
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }

}















// const db = require("../models");
// const staff = require("../models/staff.model")
// const Registeration = db.registeration;

// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt");

// const loginValidation = require("../validation/login.validation");

// exports.login = async (req, res) => {






//   let payloadData = {
//     _id: req.validatedData._id,

//   };


//   const staffInstace = new staff();
//   const token = staffInstace.generateJWT(payloadData);

 


//   // console.log('Payload:', payload);
//   // console.log('Signature:', signature);

//   //   let result = {
//   //     _id: req.validatedData._id,
//   //     email: req.validatedData.email,

//   //   };

//   return res
//     .status(200)
//     .json({ success: true, message: "Login successfully", token: token });



//   //   console.log(payloadData,"payloadData");
//   //     return res
//   //         .status(200)
//   //         .send({ message: "login successfully" });



// }