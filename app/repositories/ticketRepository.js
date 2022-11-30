const {tickets} = require("../models");
const {Sequelize, Op} = require("sequelize");

module.exports = {
    getAllTickets(from, to, dept, arr){
        return tickets.findAll({
            where:{
                [Op.and]:{
                    from: {
                        [Op.like]: `%${from}%`
                    },
                    to: {
                        [Op.like]: `%${to}%`
                    },
                    airport_from: {
                        [Op.like]: `%${dept}%`
                    },
                    airport_to: {
                        [Op.like]: `%${arr}%`
                    }
                }
            }
        });
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