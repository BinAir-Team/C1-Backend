const {tickets} = require("../models");

module.exports = {
    getAllTickets(){
        return tickets.findAll();
    },

    getTicketById(id){
        return tickets.findByPk(id);
    },

    createTicket(ticket){
        return tickets.create(ticket);
    },

    updateTicket(id, ticket){
        return tickets.update(ticket, {where: {id: id}});
    },

    deleteTicket(id){
        return tickets.destroy({where: {id: id}});
    }
}