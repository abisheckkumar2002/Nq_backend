const jwt = require('jsonwebtoken');



const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    address: String,
    contact: String,
    unique_id: String,
    password: String,
    conform_password: String,
    user_role: mongoose.Schema.Types.ObjectId,
    counter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Counter' }, // Using ref to link to the Counter model
    category1_id: [mongoose.Schema.Types.ObjectId],
    category2_id: [mongoose.Schema.Types.ObjectId],
    category3_id: [mongoose.Schema.Types.ObjectId], // Assuming category_id is an array of ObjectId
    notification: Boolean
  },
  { timestamps: true }
);





staffSchema.methods.generateJWT = function (payload) {
  var token = jwt.sign(payload, "test");
  return `Bearer ${token}`;
};







const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
