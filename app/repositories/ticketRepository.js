const {tickets} = require("../models");

module.exports = {
    getAllTickets(){
        return tickets.findAll();
    }
}