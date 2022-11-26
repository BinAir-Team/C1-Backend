const { getUserByRefreshToken } = require("../repositories/authRepository");

// service auth exports

// get user by refresh token
exports.getUserByToken = (token) => {
  return getUserByRefreshToken(token);
};
