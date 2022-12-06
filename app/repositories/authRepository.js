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

// put user refresh token
exports.putUserRefreshToken = (token, id) => {
  return users.update(
    { refresh_token: token },
    {
      where: { id },
      returning: true,
      plain: true,
    }
  );
};
