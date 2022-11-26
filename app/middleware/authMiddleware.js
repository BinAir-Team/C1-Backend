const jwt = require("jsonwebtoken");
const { authService } = require("../services/authService");
const { userService } = require("../services/userService");

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
  const user = await userService.getUserById(req.user.id);
  if (user.role !== "admin")
    return res.status(403).json({ message: "Forbidden" });
  next();
};
