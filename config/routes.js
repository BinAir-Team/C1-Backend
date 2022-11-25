const router = require('express').Router();
const { verifyToken, verifyRefreshToken, verifyAdmin } = require('../middleware/authMiddleware');
const {registerMember ,login, logout, refreshToken} = require('../controllers/authController');
const {getUserData, updateUserData} = require('../controllers/userController');


router.get('/', (req, res) => {
    res.send('Hello World!');
});


// auth routes
router.post('/register', registerMember);
router.post('/login', login);
router.post('/logout', logout);

// refresh token route
router.post('/refresh-token', verifyRefreshToken, refreshToken);

// user routes
router.get('/user', verifyToken, getUserData);
router.put('/user', verifyToken, updateUserData);


module.exports = router;