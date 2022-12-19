const {tickets} = require("../models");
const {Sequelize, Op} = require("sequelize");

module.exports = {
    getAllTickets(from, to, dept, arr, date_start, date_end, type){
        if(date_start){
            if(date_end){
                return tickets.findAll({
                    where:{
                        [Op.and]:{
                            from: {
                                [Op.iLike]: `%${from}%`
                            },
                            to: {
                                [Op.iLike]: `%${to}%`
                            },
                            airport_from: {
                                [Op.iLike]: `%${dept}%`
                            },
                            airport_to: {
                                [Op.iLike]: `%${arr}%`
                            },
                            date_start: date_start,
                            date_end: date_end,
                            type: {
                                [Op.iLike]: `%${type}%`
                            }
                        }
                    }
                });
            }
            else{
                return tickets.findAll({
                    where:{
                        [Op.and]:{
                            from: {
                                [Op.iLike]: `%${from}%`
                            },
                            to: {
                                [Op.iLike]: `%${to}%`
                            },
                            airport_from: {
                                [Op.iLike]: `%${dept}%`
                            },
                            airport_to: {
                                [Op.iLike]: `%${arr}%`
                            },
                            date_start: date_start,
                            type: {
                                [Op.iLike]: `%${type}%`
                            }
                        }
                    }
                });
            }
        } else{
            return tickets.findAll({
                where:{
                    [Op.and]:{
                        from: {
                            [Op.iLike]: `%${from}%`
                        },
                        to: {
                            [Op.iLike]: `%${to}%`
                        },
                        airport_from: {
                            [Op.iLike]: `%${dept}%`
                        },
                        airport_to: {
                            [Op.iLike]: `%${arr}%`
                        },
                        type: {
                            [Op.iLike]: `%${type}%`
                        }
                    }
                }
            });
        }
    },

    getFutureTicket(from, to, dept, arr, date_start, date_end, type){
        const nowDate = new Date();
        if(date_start){
            if(date_end){
                return tickets.findAll({
                    where:{
                        [Op.and]:{
                            from: {
                                [Op.iLike]: `%${from}%`
                            },
                            to: {
                                [Op.iLike]: `%${to}%`
                            },
                            airport_from: {
                                [Op.iLike]: `%${dept}%`
                            },
                            airport_to: {
                                [Op.iLike]: `%${arr}%`
                            },
                            date_start: {
                                [Op.and]: {
                                    [Op.gte]: nowDate,
                                    [Op.eq]: date_start
                                }
                            },
                            date_end: date_end,
                            type: {
                                [Op.iLike]: `%${type}%`
                            }
                        }
                    }
                });
            }
            else{
                return tickets.findAll({
                    where:{
                        [Op.and]:{
                            from: {
                                [Op.iLike]: `%${from}%`
                            },
                            to: {
                                [Op.iLike]: `%${to}%`
                            },
                            airport_from: {
                                [Op.iLike]: `%${dept}%`
                            },
                            airport_to: {
                                [Op.iLike]: `%${arr}%`
                            },
                            date_start: {
                                [Op.and]: {
                                    [Op.gte]: nowDate,
                                    [Op.eq]: date_start
                                }
                            },
                            type: {
                                [Op.iLike]: `%${type}%`
                            }
                        }
                    }
                });
            }
        } else{
            return tickets.findAll({
                where:{
                    [Op.and]:{
                        from: {
                            [Op.iLike]: `%${from}%`
                        },
                        to: {
                            [Op.iLike]: `%${to}%`
                        },
                        airport_from: {
                            [Op.iLike]: `%${dept}%`
                        },
                        airport_to: {
                            [Op.iLike]: `%${arr}%`
                        },
                        date_start:{
                            [Op.gte]: nowDate
                        },
                        type: {
                            [Op.iLike]: `%${type}%`
                        }
                    }
                }
            });
        }
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