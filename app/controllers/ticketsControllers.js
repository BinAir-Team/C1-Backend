const ticketService = require('../services/ticketService');

module.exports = {
    async getAllTickets(req, res){
        const tickets = await ticketService.getAllTickets()
        .then(tickets => {
            res.status(200).json(
                {
                    message: "Success",
                    data: tickets
                }
            );
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
}