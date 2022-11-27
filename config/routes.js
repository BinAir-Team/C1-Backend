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

const controllers = require("../app/controllers");
const uploadMiddleware = require("../app/middleware/uploadMiddleware");

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

//ticket api
router.get(prefix + "/tickets", controllers.ticketsControllers.getAllTickets); //get all tickets
router.post(prefix + "/tickets", controllers.ticketsControllers.createTicket); //create a ticket
router.put(
  prefix + "/tickets/:id",
  controllers.ticketsControllers.updateTicket
); //update a ticket
router.delete(
  prefix + "/tickets/:id",
  controllers.ticketsControllers.deleteTicket
); //delete a ticket

//wishlist api
router.get(
  prefix + "/wishlists",
  controllers.wishlistsControllers.getAllWishlists
); //get all wishlists
router.get(
  prefix + "/wishlists/:id",
  controllers.wishlistsControllers.getWishlistById
); //get a wishlist by id
router.get(
  prefix + "/wishlists/user/:usersId",
  controllers.wishlistsControllers.findWhistlistByUser
); //get a wishlist by user id
router.get(
  prefix + "/wishlists/ticket/:ticketsId",
  controllers.wishlistsControllers.findWhistlistByTicket
); //get a wishlist by ticket id
router.post(
  prefix + "/wishlists",
  controllers.wishlistsControllers.createWishlist
); //create a wishlist
router.delete(
  prefix + "/wishlists/:id",
  controllers.wishlistsControllers.deleteWishlist
); //delete a

//transactions api
router.get(prefix + "/trans", controllers.transControllers.getAllTrans);
router.get(prefix + "/trans/:id", controllers.transControllers.getTransByid);
router.get(
  prefix + "/trans/user/:id",
  controllers.transControllers.getTransByUserId
);
router.post(prefix + "/trans", controllers.transControllers.createTrans);
router.delete(
  prefix + "/trans/:id",
  controllers.transControllers.deleteTransById
);
router.put(
  prefix + "/trans/:id",
  uploadMiddleware,
  controllers.transControllers.updateTrans
);

module.exports = router;
