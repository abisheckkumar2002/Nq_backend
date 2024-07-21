const db = require('../models');
const { Types } = require("mongoose");

const Staff = db.staff;

exports.create = (req, res) => {


  // Create a Counter instance
  const staff = new Staff({
    name: req.body.name,
    username: req.body.username,
    contact: req.body.contact,
    email: req.body.email,
    address: req.body.address,
    unique_id: req.body.unique_id,
    password: req.body.password,
    conform_password: req.body.conform_password,
    user_role: Types.ObjectId(req.body.user_role),
    counter_id: Types.ObjectId(req.body.counter_id),
    category1_id: Types.Array(req.body.category1_id),
    category2_id: Types.Array(req.body.category2_id),
    category3_id: Types.Array(req.body.category3_id),
    notification: req.body.notification

  });

  // Save Counter instance in the database
  staff
    .save()
    .then(data => {
      res.send({
        status: "200",
        message: 'Staff created successfully',

      });


    


    })


    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the staff."
      });
    });
};



exports.findOne = (req, res) => {






  const id = req.params.id;

  Staff.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Counter with id " + id });

      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Counter with id=" + id });
    });


}




// Update a Staff by the id in the request

exports.update = (req, res) => {


  var size = Object.keys(req.body).length;
  if (size == 0) {
    res.status(500).send({
      message: "Request body must need"
    });

    return;
  }
  const id = req.params.id;

  Staff.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {

      console.log(data, 'kkkkkkkkkk')

      if (!data) {
        res.status(404).send({
          message: `Cannot update Staff with id=${id}. Maybe Staff was not found!`
        });
      }
      else res.send({
        status: "200",
        message: "Staff was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Staff with id=" + id
      });
    });
};


exports.findAll = (req, res) => {



  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Staff.find(condition).populate('counter_id')
    .sort({ createdate: -1 })
    .then(data => {
      res.send({
        status: "200",
        staffList: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving counters."
      });
    });
};






// Delete a Staff with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Staff.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Staff with id=${id}. Maybe Staff was not found!`
        });
      } else {
        res.send({
          status: "200",
          message: "Staff was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete staff with id=" + id
      });
    });
};








