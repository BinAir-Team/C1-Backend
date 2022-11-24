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

module.exports = router;