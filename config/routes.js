const router = require("express").Router();
const {
  verifyToken,
  verifyAdmin,
} = require("../app/middleware/authMiddleware");
const {
  registerMember,
  login,
  getCurrentUser,
  logout,
} = require("../app/controllers/authControllers");
const {
  postUserData,
  getUserDataMember,
  updateUserData,
  deleteUserData,
} = require("../app/controllers/userControllers");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// auth routes
router.post("/register", registerMember); //done
router.post("/login", login); //done
router.delete("/logout", logout); //done

// user routes
router.get("/user", verifyToken, getCurrentUser); //done
router.put("/user", verifyToken, updateUserData);

// admin CRUD user routes
router.get("/admin/users", verifyToken, verifyAdmin, getUserDataMember);
router.post("/admin/users", verifyToken, verifyAdmin, postUserData);
router.put("/admin/user/:id", verifyToken, verifyAdmin, updateUserData);
router.delete("/admin/user/:id", verifyToken, verifyAdmin, deleteUserData);

module.exports = router;
