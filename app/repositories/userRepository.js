const {users} = require('../models');

// repository user exports

// findOne
exports.findOne = (id) => {
    return users.findByPk({
        where: {
            id
        },
        attributes: { exclude: ['password'] },
        include: ['notifications', 'transactions', 'wishlists']
    });
};

// update
exports.update = (id, data) => {
    return users.update(data, {
        where: {
            id
        }
    });
} 
