

const db = require("../models");

const moment = require('moment');



const Counter = db.counters;
// Create and Save a new Counter


exports.create = (req, res) => {

  console.log("bodyyy", req.body);



  // Create a Counter instance
  const newCounter = new Counter({
    title: req.body.title,
    description: req.body.description,     // this is called javascript literal
    published: req.body.published
  });

  // Save Counter instance in the database
  newCounter
    .save()
    .then(data => {

      res.send({
        status: "200",
        message: 'counter created successfully'
      });


    })


    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Counter."
      });
    });
};

// Retrieve all counters from the database.
exports.findAll = (req, res) => {
  const title = req.query.tittle;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  console.log("ssss", condition);

  Counter.find(condition)
    .sort({ createdate: -1 }).array.forEach(element => {
      
    }); // Sorting by createdAt field in descending order
    .then(data => {
      res.status(200).send({
        status: "200",
        counter_list: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving counters."
      });
    });
};

// Find a single Counter with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Counter.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Counter with id " + id });
      else res.send( {'counter': data});
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Counter with id=" + id });
    });
};

// Update a Counter by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Counter.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {

      console.log(data, 'kkkkkkkkkk')

      if (!data) {
        res.status(404).send({
          message: `Cannot update Counter with id=${id}. Maybe Counter was not found!`
        });
      } else res.status(200).send({
        status: "200",
        message: "Counter was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Counter with id=" + id
      });
    });
};

// Delete a Counter with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Counter.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Counter with id=${id}. Maybe Counter was not found!`
        });
      } else {
        res.status(200).send({
          status: "200",
          message: "Counter was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Counter with id=" + id
      });
    });
};

// Delete all counters from the database.
exports.deleteAll = (req, res) => {
  Counter.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} counters were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all counters."
      });
    });
};

// Find all published counters
exports.findAllPublished = (req, res) => {
  Counter.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving counters."
      });
    });
};