const userRepository = require('../repositories/userRepository');

// service user exports

// getUserById
exports.getUserById = (id) => {
    return userRepository.findOne(id);
}

// updateUser
exports.updateUser = (id, data) => {
    return userRepository.update(id, data);
}

