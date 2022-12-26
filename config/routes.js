const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
let options = {
  explorer: true,
};

// import auth controller
const {
  registerMember,
  login,
  getCurrentUserData,
  putCurrentUserData,
  putCurrentUserPassword,
} = require("../app/controllers/authControllers");
// import promo controller

const {
  getAllPromos,
  getAllPromosWithPagination,
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

const {
  forgetPass,
  resetPassView,
  resetPass,
} = require("../app/controllers/forgetPassController");

const {
  sendEmailVerification,
  verifyEmail,
} = require("../app/controllers/emailVerification");

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

// forget password
router.post(prefix + "/forget-password", forgetPass);
router.get(prefix + "/reset-password/:token", resetPassView);
router.put(prefix + "/reset-password", resetPass);

// email verification
router.post(prefix + "/send-email/", sendEmailVerification);
router.get(prefix + "/verify-email/:email", verifyEmail);

// email verified view (just check if it works)
router.get("/email-verified", function (req, res) {
  res.render("emailVerified.ejs");
});

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
// update current user password (token required)
router.put(prefix + "/user/password", verifyToken, putCurrentUserPassword);

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

// promo routes for user
router.get(prefix + "/promos", getAllPromosWithPagination);
router.get(prefix + "/promo/:id", getPromoById);

// admin CRUD promo routes
router.get(
  prefix + "/admin/promos",
  verifyToken,
  verifyAdmin,
  getAllPromosWithPagination
);
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
router.get(prefix + "/wishlists/user", verifyToken, findWhistlistByUser); //get a wishlist by user id
router.get(
  prefix + "/wishlists/ticket/",
  verifyToken,
  verifyAdmin,
  findWhistlistByTicket
); //get a wishlist by ticket id
router.post(prefix + "/wishlists", verifyToken, createWishlist); //create a wishlist
router.delete(prefix + "/wishlists/:id", verifyToken, deleteWishlist); //delete a wishlist

//swagger openapi routes
router.use(prefix + "/openapi", swaggerUi.serve);
router.get(prefix + "/openapi", swaggerUi.setup(swaggerDocument, options));

//transactions api
router.get(
  prefix + "/admin/trans",
  verifyToken,
  verifyAdmin,
  controllers.transControllers.getAllTrans
);
router.get(
  prefix + "/trans/user",
  verifyToken,
  controllers.transControllers.getTransByUserId
);
router.get(
  prefix + "/trans/:id",
  verifyToken,
  controllers.transControllers.getTransByid
);
router.post(
  prefix + "/trans",
  verifyToken,
  controllers.transControllers.createTrans
);
router.delete(
  prefix + "/admin/trans/:id",
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

//search API
router.get(prefix + "/search", controllers.searchControllers.getSearch);
router.post(
  prefix + "/admin/search",
  verifyToken,
  verifyAdmin,
  controllers.searchControllers.addSearch
);

//member notif api
router.get(
  prefix + "/notify",
  verifyToken,
  controllers.notifControllers.getNotifByUserId
);
router.get(
  prefix + "/notify/:id",
  verifyToken,
  controllers.notifControllers.getNotifByid
);
router.put(
  prefix + "/notify",
  verifyToken,
  controllers.notifControllers.updateNotif
);
router.put(
  prefix + "/notify/all",
  verifyToken,
  controllers.notifControllers.updateNotifAll
);

//admin notif
router.get(
  prefix + "/admin/notify/",
  verifyToken,
  verifyAdmin,
  controllers.notifControllers.getAllNotif
);
router.get(
  prefix + "/admin/notify/:id",
  verifyToken,
  verifyAdmin,
  controllers.notifControllers.getNotifByid
);
router.post(
  prefix + "/admin/notify",
  verifyToken,
  verifyAdmin,
  controllers.notifControllers.createAdmin
);
router.delete(
  prefix + "/admin/notify/:id",
  verifyToken,
  verifyAdmin,
  controllers.notifControllers.deleteNotifById
);

module.exports = router;
