
const { array } = require("joi");
const db = require("../models");

const { Types } = require("mongoose");
const Ticket = db.ticket
const Counter = db.counters;
const TicketStauts = db.ticketstatus;
const Skip = db.skipstatus;
const Transfer = db.transferstatus

exports.create = (req, res) => {

    console.log("bodyyy", req.body.status);

    _id = req.user.id
    console.log(_id, "_id_id_id_id_id_id_id_id_id")

    // Create a Counter instance
    if (req.body.status == "SKIP") {

        const skipStatus = new Skip({
            Ticket_id: req.body.ticket_id,
            Staff_id: _id,
            status: req.body.status
        });

        skipStatus.save()
            .then(data => {

                res.send({
                    status: "200",
                    data: data,
                    message: 'Ticket was updated successfully'
                });


            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Counter."
                });
            });

    }
    else if (req.body.status == "TRANSFER") {

        const transferStauts = new Transfer({
            Ticket_id: req.body.ticket_id,
            Staff_id: _id,
            status: req.body.status
        });

        // Save Counter instance in the database
        transferStauts
            .save()
            .then(data => {

                res.send({
                    status: "200",
                    data: data,
                    message: 'Ticket was updated successfully'
                });


            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Counter."
                });
            });




    }


    // const ticketStauts = new TicketStauts({
    //     Ticket_id: req.body.ticket_id,
    //     Staff_id: _id,
    //     status: req.body.status
    // });

    // // Save Counter instance in the database
    // ticketStauts
    //     .save()
    //     .then(data => {

    //         res.send({
    //             status: "200",
    //             data: data,
    //             message: 'Ticket was updated successfully'
    //         });


    //     })


    //     .catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while creating the Counter."
    //         });
    //     });
};













































exports.matchCall1 = async (req, res) => {
    category1 = req.user.category1
    category2 = req.user.category2
    category3 = req.user.category3
    staffcounter = req.user.counter
    console.log(staffcounter, 'fffffffffffffffffffffffffffffffff')



    // console.log(counter, 'counter_id')

    // var data = response.data.products.data.map(e => {



    // counter_id

    const array = [
        {
            category_id: { $in: category1 }
        },
        // { status: "Waiting" }
    ]


    if (category2.length) {

        var data = {
            child_id: { $in: category2 }
        }
        array.push(data)

    }
    if (category3.length) {

        var data1 = {
            subchild_id: { $in: category3 }
        }
        array.push(data1)

    }
    // console.log(array, 'array')


    Ticket.find({
        $and: array
    })
        .sort({ createdate: 1 })


        .then(async (data) => {

            // const getClockTime_2 = (time) => {

            //     var initial = 0
            //        initial+=time
            // var waiting = time + initial

            // console.log(initial, "min")
            //     let date = new Date();

            //     let hr = date.getHours();
            //     let min = date.getMinutes();
            //     let sec = date.getSeconds();
            //     min++ // causes the min to go to 60 and change the hour one second later.

            //     hr = ("0" + hr).slice(-2);
            //     min = ("0" + min).slice(-2);
            //     sec = ("0" + sec).slice(-2);


            // var clock24  = `${0}:${sec}`;

            // console.log('clock24',clock24)

            // res.send({
            //     status: "200",
            //     status_waiting: clock24

            // });

            // }
            // setInterval(getClockTime_2(1), 2000);
            const countername = async () => {
                try {
                    var countername = await Counter.findById(staffcounter)
                    return countername
                }
                catch (err) {
                    res.status(500).send({ message: err });
                }

            }
            const functioncall = await countername()

            var datas = data.map(e => {

                return ({

                    Staff_counter: functioncall.title,
                    _id: e._id,
                    category_id: e.category_id,
                    child_id: e.child_id,
                    subchild_id: e.subchild_id,
                    ticket_no: e.ticket_no,
                    name: e.name,
                    mobile: e.mobile,
                    status: e.status,
                    createdate: e.createdate

                })
            })

            res.send({
                status: "200",
                List: datas


            });




        })

        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieve the ticket."
            });
        })


};




// exports.matchCall = async (req, res) => {


//     staff_id = req.user.id
//     console.log( staff_id, 'staff_idstaff_id')

//     const array = [
//         {
//             Staff_id: { $in: staff_id }
//         },

//     ]

//     WaitingTicket.find({
//         $and: array
//     })
//         .sort({ createdate: -1 })
//         .then(async (data) => {

//             var data11 = data.map(e => {
//                 return (

//                     Ticket_id = e.Ticket_id
//                 )


//             })


//             // res.send({
//             //     status: "200",
//             //     matchstaff: data11

//             // });
//             const array1 = [
//                 {
//                     _id: { $in: data11 }
//                 },

//             ]

//             Ticket.find({
//                 $and: array1
//             })
//                 .sort({ createdate: -1 })


//                 .then(async (data) => {



//                     res.send({
//                         status: "200",
//                         filter: data

//                     });




//                 })

//                 .catch(err => {
//                     res.status(500).send({
//                         message: err.message || "Some error occurred while retrieve the ticket."
//                     });
//                 })










//         })

//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieve the ticket."
//             });
//         })



// }
















exports.statusUpdate = (req, res) => {


    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    console.log(req.body._id, 'dddddddddddddddddddddddddddddddddddddddddddd')

    Ticket.findByIdAndUpdate(req.body._id, req.body, { new: true }).exec()
        .then(data => {
            console.log(data, "data");
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Ticket with id=${id}. Maybe Ticket was not found!`
                });

            }
            else res.status(200).send({
                status: "200",
                data: data,
                message: "Ticket was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Ticket  Status with id=" + id
            });
        });
};





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