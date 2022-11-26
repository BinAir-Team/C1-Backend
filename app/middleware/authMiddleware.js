const jwt = require("jsonwebtoken");
const {
  getUserByRefreshToken,
  putUserRefreshToken,
} = require("../repositories/authRepository");
const {
  getUserByRoleMember,
  getUserById,
  getUserByEmail,
  updateUser,
  createUser,
  deleteUser,
} = require("../services/userService");

// auth middleware exports

//  Verify Token
exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // check if token exist
  if (token == null) return res.status(401).json({ message: "Unauthorized" });

  // verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
};

// Verify Admin
exports.verifyAdmin = async (req, res, next) => {
  const { id } = req.user;
  // get user by id
  const user = await getUserById(id);
  // check if user role is admin
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
