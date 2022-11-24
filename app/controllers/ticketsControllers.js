const ticketService = require('../services/ticketService');

module.exports = {
    async getAllTickets(req, res){
        try{
            const tickets = await ticketService.getAllTickets();
            res.status(200).send(tickets);
        } catch (err){
            res.status(500).send(err);
        }
    }
}