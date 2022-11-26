const router = require("express").Router();
const {
  verifyToken,
  verifyAdmin,
} = require("../app/middleware/authMiddleware");
const {
  registerMember,
  login,
  getCurrentUser,
  putCurrentUser,
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
// get current user
router.get("/user", verifyToken, getCurrentUser); //done
//  update current user with token
router.put("/user", verifyToken, putCurrentUser); //done
// update current user with id
router.put("/user/:id", verifyToken, updateUserData); //done

// admin CRUD user routes
router.get("/admin/users", verifyToken, verifyAdmin, getUserDataMember); //done
router.post("/admin/users", verifyToken, verifyAdmin, postUserData); //done
router.put("/admin/user/:id", verifyToken, verifyAdmin, updateUserData); //done
router.delete("/admin/user/:id", verifyToken, verifyAdmin, deleteUserData); //done

module.exports = router;
