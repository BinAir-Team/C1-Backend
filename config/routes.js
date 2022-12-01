const router = require("express").Router();

// import auth controller
const {
  registerMember,
  login,
  getCurrentUserData,
  putCurrentUserData,
  logout,
} = require("../app/controllers/authControllers");
// import promo controller

const {
  getAllPromos,
  getPromoById,
  createPromo,
  updatePromo,
  deletePromo,
} = require("../app/controllers/promoControllers");

// import user controller
const {
  postUserData,
  getUserDataMember,
  updateUserData,
  deleteUserData,
} = require("../app/controllers/userControllers");

// import wishlist controller
const {
  getAllWishlists,
  getWishlistById,
  findWhistlistByUser,
  findWhistlistByTicket,
  createWishlist,
  deleteWishlist,
} = require("../app/controllers/wishlistsControllers");

// import ticket controller
const {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../app/controllers/ticketsControllers");

// import order controller
const controllers = require("../app/controllers");

// import auth middleware
const {
  verifyToken,
  verifyAdmin,
} = require("../app/middleware/authMiddleware");

// middleware
const uploadMiddleware = require("../app/middleware/uploadMiddleware");
const imageUpload = require("../app/middleware/imageUploadMiddleware");
const {
  uploadWithCloudinary,
} = require("../app/middleware/cloudinaryMiddleware");

// prefix
const prefix = "/api/v1";

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// auth routes
router.post(prefix + "/register", registerMember);
router.post(prefix + "/login", login);
router.delete(prefix + "/logout", logout);

// user routes
// get current user data (token required)
router.get(prefix + "/user", verifyToken, getCurrentUserData);
//  update current user data (token required)
router.put(
  prefix + "/user",
  verifyToken,
  imageUpload.single("profile_image"),
  uploadWithCloudinary,
  putCurrentUserData
);

// promo routes for user
router.get(prefix + "/promos", verifyToken, getAllPromos);
router.get(prefix + "/promo/:id", verifyToken, getPromoById);

// admin CRUD user routes
router.get(
  prefix + "/admin/users",
  verifyToken,
  verifyAdmin,
  getUserDataMember
);
router.post(prefix + "/admin/users", verifyToken, verifyAdmin, postUserData);
router.put(
  prefix + "/admin/user/:id",
  verifyToken,
  verifyAdmin,
  imageUpload.single("profile_image"),
  uploadWithCloudinary,
  updateUserData
);
router.delete(
  prefix + "/admin/user/:id",
  verifyToken,
  verifyAdmin,
  deleteUserData
);

// admin CRUD promo routes
router.get(prefix + "/admin/promos", verifyToken, verifyAdmin, getAllPromos);
router.post(
  prefix + "/admin/promos",
  verifyToken,
  verifyAdmin,
  imageUpload.single("promo_image"),
  uploadWithCloudinary,
  createPromo
);
router.put(
  prefix + "/admin/promo/:id",
  verifyToken,
  verifyAdmin,
  imageUpload.single("promo_image"),
  uploadWithCloudinary,
  updatePromo
);
router.delete(
  prefix + "/admin/promo/:id",
  verifyToken,
  verifyAdmin,
  deletePromo
);

//ticket api
router.get(prefix + "/tickets", getAllTickets); //get all tickets
router.get(prefix + "/tickets/id/:id", getTicketById); //get ticket by id
router.post(prefix + "/tickets", verifyToken, verifyAdmin, createTicket); //create a ticket
router.put(prefix + "/tickets/:id", verifyToken, verifyAdmin, updateTicket); //update a ticket
router.delete(prefix + "/tickets/:id", verifyToken, verifyAdmin, deleteTicket); //delete a ticket

//wishlist api
router.get(prefix + "/wishlists", verifyToken, verifyAdmin, getAllWishlists); //get all wishlists
router.get(prefix + "/wishlists/id/:id", verifyToken, getWishlistById); //get a wishlist by id
router.get(prefix + "/wishlists/user/", verifyToken, findWhistlistByUser); //get a wishlist by user id
router.get(
  prefix + "/wishlists/ticket/",
  verifyToken,
  verifyAdmin,
  findWhistlistByTicket
); //get a wishlist by ticket id
router.post(prefix + "/wishlists", verifyToken, createWishlist); //create a wishlist
router.delete(prefix + "/wishlists/:id", verifyToken, deleteWishlist); //delete a wishlist

//transactions api
router.get(
  prefix + "/trans",
  verifyToken,
  verifyAdmin,
  controllers.transControllers.getAllTrans
);
router.get(
  prefix + "/trans/:id",
  verifyToken,
  controllers.transControllers.getTransByid
);
router.get(
  prefix + "/trans",
  verifyToken,
  verifyAdmin,
  controllers.transControllers.getAllTrans
);
router.get(
  prefix + "/trans/:id",
  verifyToken,
  controllers.transControllers.getTransByid
);
router.get(
  prefix + "/trans/user",
  verifyToken,
  controllers.transControllers.getTransByUserId
);
router.post(
  prefix + "/trans",
  verifyToken,
  controllers.transControllers.createTrans
);
router.delete(
  prefix + "/trans/:id",
  verifyToken,
  verifyAdmin,
  controllers.transControllers.deleteTransById
);
router.put(
  prefix + "/trans/:id",
  verifyToken,
  uploadMiddleware,
  controllers.transControllers.updateTrans
);

module.exports = router;
