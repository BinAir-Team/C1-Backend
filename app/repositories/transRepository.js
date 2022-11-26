const { transactions } = require('../models');

module.exports = {
    findAll() {
        return transactions.findAll({
            include: {all:true, attributes: {exclude: ['password','createdAt','updatedAt','role','phone','email','available','init_stock','curr_stock']}},
        });
    },
    
    findByPk(id) {
        return transactions.findByPk(id,{
            include: {all: true, attributes: {exclude: ['password','createdAt','updatedAt','role','phone','email','available','init_stock','curr_stock']}}
        });
    },

    deleteByPk(id) {
        return transactions.destroy({
            where: {id}
        });
    },

    findByUserId(id) {
        return transactions.findAll({
            where: {usersId: id},
            include: {all: true, attributes: {exclude: ['password','createdAt','updatedAt','role','phone','email','available','init_stock','curr_stock']}}
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