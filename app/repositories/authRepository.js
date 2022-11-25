const {users} = require('../models');

// repository auth exports

// get user by refresh token
exports.getUserByRefreshToken = (token) => {
    return users.findOne({
        where: {
          refreshToken: token
        }
    });
}




