const { users } = require("../models");

// repository user exports

// find all by role member
exports.findAll = () => {
  return users.findAll({
    where: {
      role: "member",
    },
  });
};

//  find  by refresh_token
exports.findByRefreshToken = (refresh_token) => {
  return users.findOne({
    where: {
      refresh_token,
    },
  });
};

// findOne
exports.findOne = (id) => {
  return users.findOne({
    where: {
      id: id,
    },
    include: ["notifications", "transactions", "wishlists"],
  });
};

// find user by email
exports.findByEmail = (email) => {
  return users.findOne({
    where: {
      email,
    },
    include: ["notifications", "transactions", "wishlists"],
  });
};

// check verified
exports.checkVerified = (email) => {
  return users.findOne({
    attributes: ["verified"],
    where: {
      email,
    },
  });
};

// update
exports.update = (id, data) => {
  return users.update(data, {
    where: {
      id,
    },
  });
};

// create member
exports.create = (data) => {
  return users.create(data);
};

// delete
exports.delete = (id) => {
  return users.destroy({
    where: {
      id,
    },
  });
};
