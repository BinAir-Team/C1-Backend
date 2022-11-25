const router = require('express').Router();
const { verifyToken, verifyAdmin } = require('../app/middleware/authMiddleware');
const {registerMember ,login, logout} = require('../app/controllers/authController');
const {getUserData, updateUserData} = require('../app/controllers/userController');


router.get('/', (req, res) => {
    res.send('Hello World!');
});


// auth routes
router.post('/register', registerMember);
router.post('/login', login);
router.post('/logout', logout);


// user routes
router.get('/user', verifyToken, getUserData);
router.put('/user', verifyToken, updateUserData);


module.exports = router;