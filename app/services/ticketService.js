const ticketRepository = require('../repositories/ticketRepository');

module.exports = {
    async getAllTickets(from, to, dept, arr){
        try{
            const tickets = await ticketRepository.getAllTickets(from, to, dept, arr);
            // console.log(tickets);
            return tickets;
        }
        catch(err){
            throw err;
        }
    },

    async getTicketById(id){
        try{
            const ticket = await ticketRepository.getTicketById(id);
            return ticket;
        }
        catch(err){
            throw err;
        }
    },

    async createTicket(ticket){
        try{
            const newTicket = await ticketRepository.createTicket(ticket);
            return newTicket;
        }
        catch(err){
            throw err;
        }
    },

    async updateTicket(id, ticket){
        try{
            const updatedTicket = await ticketRepository.updateTicket(id, ticket);
            return updatedTicket;
        }
        catch(err){
            throw err;
        }
    },

    async deleteTicket(id){
        try{
            const deletedTicket = await ticketRepository.deleteTicket(id);
            return deletedTicket;
        }
        catch(err){
            throw err;
        }
    }
}