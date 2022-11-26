const {
  getUserByRefreshToken,
  putUserRefreshToken,
} = require("../repositories/authRepository");

// service auth exports

// get user by refresh token
exports.getUserByToken = (token) => {
  return getUserByRefreshToken(token);
};

// put user refresh token
exports.updateUserRefreshToken = (token, id) => {
  return putUserRefreshToken(token, id);
};
