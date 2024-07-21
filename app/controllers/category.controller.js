const mongoose = require('mongoose');

const db = require("../models");

const Category = db.category;

// Create and Save a new Counter
exports.create = async (req, res) => {
   

    // Create a Counter
    const category = new Category({

        category_name: req.body.category_name,
        category_other_language: req.body.category_other_language,
        arcronym: req.body.arcronym,
        display_on: (req.body.display_on),
        back_end: (req.body.back_end),
    });

    // Save Categoruy in the database
    category
        .save()
        .then(async (data) => {

            res.status(200).send({
                status: "200",
                message: 'Category created successfully'
            });

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Category."
            });
        });
};

// Retrieve all counters from the database.
exports.findAll = (req, res) => {
    const category_name = req.query.category_name;
    var condition = category_name ? { category_name: { $regex: new RegExp(category_name), $options: "i" } } : {};

    Category.find(condition)
        .then(data => {
            res.send({
                status: "200",
                category_list: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving category."
            });
        });
};

// Find a single Counter with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found category with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving category with id=" + id });
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

    Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {


                res.status(404).send({

                    message: `Cannot update category with id=${id}. Maybe category was not found!`
                });
            } else res.send({
                status: "200",
                message: "Counter was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating category with id=" + id
            });
        });
};

// Delete a Counter with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete category with id=${id}. Maybe Category was not found!`
                });
            } else {
                res.send({
                    status: "200",
                    message: "Category was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete category with id=" + id
            });
        });
};

// Delete all counters from the database.
exports.deleteAll = (req, res) => {
    Category.deleteMany({})
        .then(data => {
            res.send({
                status: "200",
                message: `${data.deletedCount} category were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all category."
            });
        });
};

