
const db = require("../models");

const { Types } = require("mongoose");
const Category2 = db.category2


exports.create = (req, res) => {

  try {
    const category2 = new Category2({

      category_id: Types.ObjectId(req.body.category_id),
      child: req.body.child,
      category_other_language: req.body.category_other_language,
      arcronym: req.body.arcronym,
      display_on: req.body.display_on,
      back_end: req.body.back_end

    });

    // Save Counter instance in the database
    category2
      .save()
      .then(data => {

        res.status(200).send({
          status: "200",
          message: 'category level 2 created successfully'
        });


      })

  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Category 2."
    });
  }


};


exports.findAll = (req, res) => {

  const category = req.query.category;
  const child = req.query.child;
  const arcronym = req.query.arcronym;

  var condition = {};

  // Check which category parameter is present and set the corresponding condition
  if (category) {
  console.log("ssss" ,category);
    condition = { category_id: { $regex: new RegExp(category), $options: "i" } };
    return condition;
  } else if (child) {
    console.log('suri ' ,child);
    condition = { child: { $regex: new RegExp(child), $options: "i" } };
    return condition;
  } else if (arcronym) {
    console.log(arcronym,'arcronym');
    condition = { arcronym: { $regex: new RegExp(arcronym), $options: "i" } };
    return condition;
  } else {

    Category2.find(condition).populate('category_id')
      .sort({ createdate: -1 })
      .then(data => {
        res.status(200).send({
          status: "200",
          child: data
        });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving counters."
        });
      });
  }

};





