const {Ticket} = require("../models");

module.exports = {
    getAllTickets(){
        return Ticket.findAll();
    }
}