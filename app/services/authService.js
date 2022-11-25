const {authRepository} = require('../repositories/authRepository');

// service auth exports

// get user by refresh token
exports.getUserByRefreshToken = (token) => {
    return authRepository.getUserByRefreshToken(token);
}
 