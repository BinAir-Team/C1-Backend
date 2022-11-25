const {users} = require('../models');

// repository auth exports

// get user by token 
exports.getUserByToken = (token) => {
    return users.findOne({
        where: {
          refreshToken: token
        }
    });
}





