const ticketService = require('../services/ticketService');
const notifService  = require('../services/notifService');
const {v4:uuid} = require('uuid');
const moment = require('moment');

module.exports = {
    async getAllTickets(req, res){
        const from = req.query.from ? req.query.from : '';
        const airport_from = req.query.airport_from ? req.query.airport_from : '';
        const to = req.query.to ? req.query.to : '';
        const airport_to = req.query.airport_to ? req.query.airport_to : '';
        const date = req.query.date;
        const type = req.query.type ? req.query.type : '';
        const willFly = req.query.willFly ? req.query.willFly : 'false';
        const tickets = await ticketService.getAllTickets(from, to, airport_from, airport_to, date, type, willFly)
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

    async getTicketById(req, res){
        const ticket = await ticketService.getTicketById(req.params.id)
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
        await notifService.createNotif({id: uuid(),usersId: req.user.id,message: `Sukses Menambah tiket rute ${from}-${to} pada ${moment().format('MMMM Do YYYY, h:mm:ss a')}`, isRead: false});
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
        await notifService.createNotif({id: uuid(),usersId: req.user.id,message: `Sukses update tiket dengan id:${id} pada ${moment().format('MMMM Do YYYY, h:mm:ss a')}`, isRead: false});
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
        const tickets = await ticketService.getTicketById(id);
        if(!tickets){
            res.status(404).json({
                msg: "ticket not found / invalid",
                status: 404,
            });
            return
        }
        await notifService.createNotif({id: uuid(),usersId: req.user.id,message: `Sukses menghapus tiket rute ${tickets.dataValues.from}-${tickets.dataValues.to} pada ${moment().format('MMMM Do YYYY, h:mm:ss a')}`, isRead: false});
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