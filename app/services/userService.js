const userRepository = require('../repositories/userRepository');

// service user exports

// find all users role member
exports.getUserByRoleMember = () => {
    return userRepository.findAll();
}

// getUserById
exports.getUserById = (id) => {
    return userRepository.findOne(id);
}

// getUserByEmail
exports.getUserByEmail = (email) => {
    return userRepository.findByEmail(email);
}

// updateUser
exports.updateUser = (id, data) => {
    return userRepository.update(id, data);
}

// createUser
exports.createUser = (data) => {
    return userRepository.create(data);
}

// deleteUser
exports.deleteUser = (id) => {
    return userRepository.delete(id);
}
