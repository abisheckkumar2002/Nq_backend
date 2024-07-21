
const db = require("../models");

const { Types } = require("mongoose");
const Category3 = db.category3


exports.create = (req, res) => {

  try {
    const category3 = new Category3({

      category_id: Types.ObjectId(req.body.category_id),
      child_id: Types.ObjectId(req.body.child_id),
      subchild: req.body.subchild,
      category_other_language: req.body.category_other_language,



    });

    // Save Counter instance in the database
    category3
      .save()
      .then(data => {

        res.status(200).send({
          status: "200",
          message: 'category level 3 created successfully'
        });


      })

  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Category 3."
    });
  }


};


exports.findAll = (req, res) => {

  const filter1 = req.query.category;
  const filter2 = req.query.child;
  const filter3 = req.query.subchild;

  var filter = {};


  // Check which category parameter is present and set the corresponding condition
  if ((filter1) || (filter2) || (filter3)) {

    var data = filter1 ? { "category_id.category_name": { $regex: new RegExp(filter1), $options: "i" } } :
      filter2 ? { child_id: { $regex: new RegExp(filter2), $options: "i" } } :
        filter3 ? { subchild: { $regex: new RegExp(filter3), $options: "i" } } : {}

    console.log("ssss", data);


    Category3.find(data).populate('category_id').populate('child_id')
      .sort({ createdate: -1 })
      .then(data => {
        res.status(200).send({
          status: "200",
          level_3_categories: data
        });


      })


      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Categpry3."
        });
      });

  } else {

    console.log('abi');
    Category3.find(filter).populate('category_id').populate('child_id')
      .sort({ createdate: -1 })
      .then(data => {
        res.status(200).send({
          status: "200",
          level_3_categories: data
        });


      })


      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Categpry3."
        });
      });
  }

};