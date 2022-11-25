const router = require('express').Router();
const { authController } = require('../controllers');


router.get('/', (req, res) => {
    res.send('Hello World!');
});

const prefix = '/api/v1';

// auth routes

module.exports = router;