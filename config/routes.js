const router = require('express').Router();
const controllers = require('../app/controllers');
const uploadMiddleware = require('../app/middleware/uploadMiddleware');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

const prefix = '/api/v1';

//user api
// router.get(prefix + '/users', controllers.authControllers.getAllUsers);

//ticket api
router.get(prefix + '/tickets', controllers.ticketsControllers.getAllTickets); //get all tickets
router.post(prefix + '/tickets', controllers.ticketsControllers.createTicket); //create a ticket
router.put(prefix + '/tickets/:id', controllers.ticketsControllers.updateTicket); //update a ticket
router.delete(prefix + '/tickets/:id', controllers.ticketsControllers.deleteTicket); //delete a ticket

//wishlist api
router.get(prefix + '/wishlists', controllers.wishlistsControllers.getAllWishlists); //get all wishlists
router.get(prefix + '/wishlists/id/:id', controllers.wishlistsControllers.getWishlistById); //get a wishlist by id
router.get(prefix + '/wishlists/user', controllers.wishlistsControllers.findWhistlistByUser); //get a wishlist by user id
router.get(prefix + '/wishlists/ticket', controllers.wishlistsControllers.findWhistlistByTicket); //get a wishlist by ticket id
router.post(prefix + '/wishlists', controllers.wishlistsControllers.createWishlist); //create a wishlist
router.delete(prefix + '/wishlists/:id', controllers.wishlistsControllers.deleteWishlist); //delete a 

//transactions api
router.get(prefix + "/trans", controllers.transControllers.getAllTrans)
router.get(prefix + "/trans/:id", controllers.transControllers.getTransByid)
router.get(prefix + "/trans/user/:id", controllers.transControllers.getTransByUserId)
router.post(prefix + "/trans", controllers.transControllers.createTrans)
router.delete(prefix + "/trans/:id", controllers.transControllers.deleteTransById)
router.put(prefix + "/trans/:id",uploadMiddleware, controllers.transControllers.updateTrans)

module.exports = router;