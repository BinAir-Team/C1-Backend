const ticketService = require('../services/ticketService');
const {v4:uuid} = require('uuid');

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
    },

    async createTicket(req, res){
        const id = uuid();
        const from = req.body.from;
        const to = req.body.to;
        const airport_from = req.body.airport_from;
        const airport_to = req.body.airport_to;
        const departure_time = req.body.departure_time;
        const arrival_time = req.body.arrival_time;
        const date = req.body.date;
        const type = req.body.type;
        const adult_price = req.body.adult_price;
        const child_price = req.body.child_price;
        const available = req.body.available;
        const init_stock = req.body.init_stock;
        const curr_stock = req.body.curr_stock;
        const newTicket = await ticketService.createTicket({
            id: id,
            from: from,
            to: to,
            airport_from: airport_from,
            airport_to: airport_to,
            departure_time: departure_time,
            arrival_time: arrival_time,
            date: date,
            type: type,
            adult_price: adult_price,
            child_price: child_price,
            available: available,
            init_stock: init_stock,
            curr_stock: curr_stock
        })
        .then(ticket => {
            res.status(200).json(
                {
                    message: "Success",
                    data: ticket
                }
            );
        })
        .catch(err => {
            res.status(500).json(err);
        });
    },

    async updateTicket(req, res){
        const id = req.params.id;
        const ticket = req.body;
        const updatedTicket = await ticketService.updateTicket(id, ticket)
        .then(ticket => {
            res.status(200).json(
                {
                    message: "Success",
                    data: ticket
                }
            );
        })
        .catch(err => {
            res.status(500).json(err);
        });
    },

    async deleteTicket(req, res){
        const id = req.params.id;
        const deletedTicket = await ticketService.deleteTicket(id)
        .then(ticket => {
            res.status(200).json(
                {
                    message: "Success",
                    data: ticket
                }
            );
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
}