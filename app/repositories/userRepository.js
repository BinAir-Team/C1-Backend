const {users} = require('../models');

// repository user exports

// find all by role member
exports.findAll = () => {
    return users.findAll({
        where: {
            role: 'member'
        }
    });
}

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

// find user by email
exports.findByEmail = (email) => {
    return users.findOne({
        where: {
            email
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
    })
};

// create member
exports.create = (data) => {
    return users.create(data);
}

// delete
exports.delete = (id) => {
    return users.destroy({
        where: {
            id
        }
    })
}