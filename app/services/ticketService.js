const ticketRepository = require('../repositories/ticketRepository');

module.exports = {
    async getAllTickets(){
        return await ticketRepository.getAllTickets();
    }
}