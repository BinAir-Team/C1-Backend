const ticketRepository = require("../repositories/ticketRepository");

module.exports = {
    async getAllTickets(from, to, dept, arr, date_start, date_end, type, willFly, offset, limit){
        try{
            if(willFly == "false"){
                const tickets = await ticketRepository.getAllTickets(from, to, dept, arr, date_start, date_end, type, offset, limit);
                return tickets;
            }
            else if(willFly == "true"){
                const tickets = await ticketRepository.getFutureTicket(from, to, dept, arr, date_start, date_end, type, offset, limit);
                return tickets;
            }
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