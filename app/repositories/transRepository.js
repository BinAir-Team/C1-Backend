const { transactions } = require("../models");
const {Sequelize, Op} = require("sequelize");

module.exports = {
    findAll(limit,offset,status) {
        if(status == ""){
            return transactions.findAndCountAll({
                include: {all:true, attributes: {exclude: ["password","createdAt","updatedAt","role","phone","email","available","init_stock","curr_stock"]}},
                order: [["updatedAt", "DESC"]],
                limit,
                offset,
            });
        }else{
        return transactions.findAndCountAll({
            where: {
                status: {[Op.iLike]: `%${status}%`}
            },
            include: {all:true, attributes: {exclude: ["password","createdAt","updatedAt","role","phone","email","available","init_stock","curr_stock"]}},
            order: [["updatedAt", "DESC"]],
            limit,
            offset,
        });
        }
    },
    
    findByPk(id) {
        return transactions.findByPk(id,{
            include: {all: true, attributes: {exclude: ["password","createdAt","updatedAt","role","phone","email","available","init_stock","curr_stock"]}}
        });
    },

    deleteByPk(id) {
        return transactions.destroy({
            where: {id}
        });
    },

    findByUserId(id,limit,offset,status) {
        if(status == ""){
            return transactions.findAndCountAll({
                where: {usersId: id},
                include: {all: true, attributes: {exclude: ["password","createdAt","updatedAt","role","phone","email","available","init_stock","curr_stock"]}},
                order: [["updatedAt", "DESC"]],
                limit,
                offset,
            })
        }else{
            return transactions.findAndCountAll({
                where: {usersId: id,status: {[Op.iLike]: `%${status}%`}},
                include: {all: true, attributes: {exclude: ["password","createdAt","updatedAt","role","phone","email","available","init_stock","curr_stock"]}},
                order: [["updatedAt", "DESC"]],
                limit,
                offset,
            })
        }
    },

    updateTransactions(id,datas){
        return transactions.update(datas,{
            where: {id}
        })
    },

    createTransactions(datas) {
        return transactions.create(datas);
    }
}