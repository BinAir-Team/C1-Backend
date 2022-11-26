const { transactions } = require('../models');

module.exports = {
    findAll() {
        return transactions.findAll();
    },
    
    findByPk(id) {
        return transactions.findByPk(id);
    },

    deleteByPk(id) {
        return transactions.destroy(id);
    },

    findByUserId(id) {
        return transactions.findAll({
            where: {usersId: id}
        })
    },

    findOne({where}){
        return User.findOne({where : where});
    },

    updateTransactions(body){
        return transactions.update(body)
    },

    createTransactions(usersId, ticketsId, amounts, traveler, payment_method, quantity, date, status) {
        return User.create({
            usersId,
            ticketsId,
            amounts,
            traveler,
            payment_method,
            quantity,
            date,
            status
        });
    }
}