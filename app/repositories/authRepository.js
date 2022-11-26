const { users } = require("../models");

// repository auth exports

// get user by refresh token
exports.getUserByRefreshToken = (token) => {
  return users.findOne({
    where: { refresh_token: token },
    attributes: { exclude: ["password"] },
    include: ["notifications", "transactions", "wishlists"],
  });
};
