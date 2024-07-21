const db = require("../models");

const { Types } = require("mongoose");
const Ticket = db.ticket
const Category = db.category

const Category2 = db.category2
const Category3 = db.category3
const WaitingTicket = db.ticketstatus;


const controller = require("../controllers/call.controller");
const Staff = require("../models/staff.model");
exports.create = async (req, res,) => {



    const getlast = await Ticket.find().sort({ createdate: -1 }).limit(1)


    console.log("customerid", getlast)
    var customerid
    if (getlast.length > 0) {
        customerid = "C3-" + (Number(getlast[0].ticket_no.split("-")[1]) + 1)

    }
    else {

        customerid = "C3-1"
    }


    const ticket = new Ticket({

        category_id: Types.ObjectId(req.body.category_id),
        child_id: (req.body.child_id),
        subchild_id: (req.body.subchild_id),
        name: req.body.name,
        mobile: req.body.mobile,
        ticket_no: customerid,


    })

    ticket
        .save()
        .then(async (data) => {
            const getWaitingTime = async () => {
                try {
                    const data = await Ticket.find().sort({ createdate: -1 });

                    console.log(data.length, "daaaaaaaaaaaaaaaaaaaaaaa")
                    var intitial_time = 0
                    var waiting_time = 10
                    for (var i = 1; data.length > i; i++) {

                        intitial_time = intitial_time + waiting_time
                    }
                    console.log(intitial_time, "waiting_time")

                    return intitial_time + " mins";

                }
                catch (err) {

                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Ticket."
                    });

                }
            };

            const waiting_time = await getWaitingTime();

            console.log(waiting_time, "waiting_time");
            res.send({
                status: "200",
                message: 'Ticket Create successfully',
                data: data,
                waiting_time: waiting_time,
              


            });

            //     var data1 = [{
            //         category1_id: { $in: data1111.category_id }
            //     }
            //     ]
            //     Staff.find({
            //         $and: data1
            //     })
            //         .sort({ createdate: -1 })


            //         .then(async (data) => {


            //             var data11 = data.map(e => {
            //                 return (

            //                     _id = e._id
            //                 )


            //             })




            //             const waitingticket = new WaitingTicket({

            //                 Staff_id: data11,
            //                 Ticket_id: data1111._id


            //             })

            //             waitingticket
            //                 .save()
            //                 .then(() => {

            //                 })

            //                 .catch(err => {
            //                     res.status(500).send({
            //                         message: err.message || "Some error occurred while creating the Ticket."
            //                     });
            //                 });





            //             res.send({
            //                 status: "200",
            //                 message: 'Ticket Create successfully',
            //             });


            //         })

            //         .catch(err => {
            //             res.status(500).send({
            //                 message: err.message || "Some error occurred while retrieve the ticket."
            //             });
            //         })

        })

        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Ticket."
            });
        });

};







exports.findAll = (req, res) => {



    console.log('====================================', req.query._id);
    Category.find({ display_on: { $in: ["Ticket_Screen", "Ticket_And_Transfer"] } })
        .sort({ createdate: -1 })
        .then(data => {
            if (req.query.category_id == undefined) {

                res.send({
                    status: "200",
                    category: data
                });


            }
            else if (req.query.category_id && data.length > 0) {

                Category2.find({
                    category_id: req.query.category_id,
                    display_on: { $in: ["Ticket_Screen", "Ticket_And_Transfer"] }
                })


                    .sort({ createdate: -1 })
                    .then(data => {
                        if (req.query.child_id == undefined) {
                            res.send({
                                status: "200",
                                child: data
                            });
                        }

                        else if ((req.query.child_id) && (data.length > 0)) {


                            Category3.find({
                                child_id: req.query.child_id,
                                category_id: req.query.category_id
                            })
                                .sort({ createdate: -1 })
                                .then(data => {

                                    res.send({
                                        status: "200",
                                        subchild: data
                                    });

                                })

                                .catch(err => {
                                    res.status(500).send({
                                        message: err.message || "Some error occurred while retrieving filter."
                                    });
                                });
                        }

                    })

                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while retrieving filter."
                        });
                    });
            }

            else {


                res.send({
                    status: "200",
                    category: []
                });

            }

        })

        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving filter."
            });
        });
}





exports.findOne = (req, res) => {
    const id = req.params.id;

    Ticket.findById(id).populate('category_id').populate('child_id').populate('subchild_id')
        .then(data => {

            if (!data) {
                res.status(404).send({ message: "Not found Counter with id " + id });
            }

            else {
                res.send({ 'Ticket': data });
            }

        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Counter with id=" + id });
        });
};
