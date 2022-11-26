const { transactions } = require('../models');

module.exports = {
    findAll() {
        return transactions.findAll({
            include:[{
                model: tickets
            },{
                model: users
            }]
        });
    },
    
    findByPk(id) {
        return transactions.findByPk(id,{
            include:[{
                model: tickets
            },{
                model: users
            }]
        });
    },

    deleteByPk(id) {
        return transactions.destroy(id);
    },

    findByUserId(id) {
        return transactions.findAll({
            where: {usersId: id},
            include: [{
                model: tickets
            },{
                model: users
            }]
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