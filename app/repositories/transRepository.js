const { transactions } = require("../models");

module.exports = {
    findAll(limit,offset) {
        return transactions.findAndCountAll({
            include: {all:true, attributes: {exclude: ["password","createdAt","updatedAt","role","phone","email","available","init_stock","curr_stock"]}},
            limit,
            offset,
        });
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

    findByUserId(id,limit,offset) {
        return transactions.findAndCountAll({
            where: {usersId: id},
            include: {all: true, attributes: {exclude: ["password","createdAt","updatedAt","role","phone","email","available","init_stock","curr_stock"]}},
            limit,
            offset,
        })
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