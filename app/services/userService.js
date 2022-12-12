const userRepository = require("../repositories/userRepository");

// service user exports

// find all users role member
exports.getUserByRoleMember = () => {
  return userRepository.findAll();
};

// getUserByToken
exports.getUserByToken = (refresh_token) => {
  return userRepository.findByRefreshToken(refresh_token);
};

// getUserById
exports.getUserById = (id) => {
  return userRepository.findOne(id);
};

// getUserByEmail
exports.getUserByEmail = (email) => {
  return userRepository.findByEmail(email);
};

//get verified status
exports.getVerifiedStatus = (email) => {
  return userRepository.checkVerified(email);
};

// updateUser
exports.updateUser = (id, data) => {
  return userRepository.update(id, data);
};

// createUser
exports.createUser = (data) => {
  return userRepository.create(data);
};

// deleteUser
exports.deleteUser = (id) => {
  return userRepository.delete(id);
};
