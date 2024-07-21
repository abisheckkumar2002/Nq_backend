const mongoose = require('mongoose');
const validStatuses = ["Waiting", "Call", "Transfer", "Skip"];
const ticketStautsSchema = new mongoose.Schema({


  Staff_id: mongoose.Schema.Types.ObjectId,

  Ticket_id: mongoose.Schema.Types.ObjectId,

  status: {
    type: String,
    default: "Waiting",
    validate: {
      validator: function (value) {
        return validStatuses.includes(value);
      },
      message: props => `${props.value} is not a valid status.`
    }
  }

 
});

const TicketStauts = mongoose.model('TicketStauts', ticketStautsSchema);

module.exports = TicketStauts;