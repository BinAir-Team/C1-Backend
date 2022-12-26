const ticketService = require("../services/ticketService");
const notifControllers = require("./notificationsControllers");
const {v4:uuid} = require("uuid");
const moment = require("moment-timezone");

const getPagination = (page, size) => {
    const limit = size ? +size : 7;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tickets } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, tickets, totalPages, currentPage };
};

module.exports = {
    async getAllTickets(req, res){
        const from = req.query.from ? req.query.from : "";
        const airport_from = req.query.airport_from ? req.query.airport_from : "";
        const to = req.query.to ? req.query.to : "";
        const airport_to = req.query.airport_to ? req.query.airport_to : "";
        const date_start = req.query.date_start;
        const date_end = req.query.date_end ? req.query.date_end : null;
        const type = req.query.type ? req.query.type : "";
        const willFly = req.query.willFly ? req.query.willFly : "false";
        const page = req.query.page;
        const size = req.query.size;
        const { limit, offset } = getPagination(page, size);
        const tickets = await ticketService.getAllTickets(from, to, airport_from, airport_to, date_start, date_end, type, willFly, offset, limit)
        .then(tickets => {
            if(tickets.rows.length == 0){
                const response = getPagingData(tickets, page, limit);
                res.status(404).json(
                    {
                        status: "error",
                        message: "ticket not found",
                        data: response
                    }
                );
            }
            else{
                const response = getPagingData(tickets, page, limit);
                res.status(200).json(
                    {
                        status: "success",
                        message: "ticket found",
                        data: response
                    }
                );
            }
        })
        .catch(err => {
            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
                data : {}
            });
        });
    },

    async getTicketById(req, res){
        const ticket = await ticketService.getTicketById(req.params.id)
        .then(ticket => {
            if(!ticket){
                res.status(404).json(
                    {
                        status: "error",
                        message: "ticket not found",
                        data: {}
                    }
                );
            }
            else{
                res.status(200).json(
                    {
                        status: "success",
                        message: "ticket found",
                        data: ticket
                    }
                );
            }
        })
        .catch(err => {
            res.status(500).json({
                status: "error",
                message: "err",
                data : {}
            });
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
        const date_start = req.body.date_start;
        const date_end = req.body.date_end;
        const type = req.body.type;
        const adult_price = req.body.adult_price;
        const child_price = req.body.child_price;
        const available = req.body.available;
        const init_stock = req.body.init_stock;
        const curr_stock = req.body.curr_stock;
        await notifControllers.createNotif(req.user.id,{id: uuid(),usersId: req.user.id,message: `Sukses Menambah tiket rute ${from}-${to} pada ${moment().locale("id").tz("Asia/Jakarta").format(
            "Do MMMM YYYY, h:mm:ss z"
          )}`, isRead: false});
        const newTicket = await ticketService.createTicket({
            id: id,
            from: from,
            to: to,
            airport_from: airport_from,
            airport_to: airport_to,
            departure_time: departure_time,
            arrival_time: arrival_time,
            date_start: date_start,
            date_end: date_end,
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
                    status: "success",
                    message: "ticket created",
                    data: ticket
                }
            );
        })
        .catch(err => {
            res.status(500).json({
                status: "error",
                message: err,
                data : {}
            });
        });
    },

    async updateTicket(req, res){
        const id = req.params.id;
        const ticket = req.body;
        const find = await ticketService.getTicketById(req.params.id)
        if(!find){
            return res.status(404).json(
                {
                    status: "error",
                    message: "id ticket not found",
                    data: {}
                }
            );
        }
        await notifControllers.createNotif(req.user.id,{id: uuid(),usersId: req.user.id,message: `Sukses update tiket dengan id:${id} pada ${moment().locale("id").tz("Asia/Jakarta").format(
            "Do MMMM YYYY, h:mm:ss z"
          )}`, isRead: false});
        const updatedTicket = await ticketService.updateTicket(id, ticket)
        .then(ticket => {
            res.status(200).json(
                {
                    status: "success",
                    message: "Ticket updated",
                    data: ticket
                }
            );
        })
        .catch(err => {
            res.status(500).json({
                status: "error",
                message: err,
                data : {}
            });
        });
    },

    async deleteTicket(req, res){
        const id = req.params.id;
        const find = await ticketService.getTicketById(id);
        if(!find){
            return res.status(404).json(
                {
                    status: "error",
                    message: "id ticket not found",
                    data: {}
                }
            );
        }
        await notifControllers.createNotif(req.user.id,{id: uuid(),usersId: req.user.id,message: `Sukses menghapus tiket rute ${find.dataValues.from}-${find.dataValues.to} pada ${moment().locale("id").tz("Asia/Jakarta").format(
            "Do MMMM YYYY, h:mm:ss z"
          )}`, isRead: false});
        const deletedTicket = await ticketService.deleteTicket(id)
        .then(ticket => {
            res.status(200).json(
                {
                    status: "success",
                    message: "ticket deleted",
                    data: ticket
                }
            );
        })
        .catch(err => {
            res.status(500).json(
                {
                    status: "error",
                    message: err,
                    data: {}
                }
            );
        });
    }
}