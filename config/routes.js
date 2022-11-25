const router = require('express').Router();
const controllers = require('../app/controllers');

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

module.exports = router;