const {getUserByRefreshToken} = require('../repositories/authRepository');

// service auth exports

// get user by refresh token
exports.getUserByToken = async (token) => {
    return await getUserByRefreshToken(token);
}
 