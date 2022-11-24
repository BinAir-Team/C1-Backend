const ticketRepository = require('../repositories/ticketRepository');

module.exports = {
    async getAllTickets(){
        try{
            const tickets = await ticketRepository.getAllTickets();
            return tickets;
        }
        catch(err){
            throw err;
        }
    }
}