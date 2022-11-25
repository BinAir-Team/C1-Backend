const {authRepository} = require('../repositories/authRepository');

// service auth exports

// get user by token
exports.getUserByToken = (token) => {
    return authRepository.getUserByToken(token);
}


 