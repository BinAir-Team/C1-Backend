const router = require('express').Router();
const { verifyToken, verifyAdmin } = require('../app/middleware/authMiddleware');
const {registerMember ,login, logout} = require('../app/controllers/authController');
const {getUserData, updateUserData} = require('../app/controllers/userController');
const { postUserData } = require('../app/controllers/userControllers');


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

// admin CRUD user routes
router.post('/admin/users', verifyToken, verifyAdmin, postUserData);
router.get('/admin/users', verifyToken, verifyAdmin, getUserDataMember);
router.put('/admin/user/:id', verifyToken, verifyAdmin, updateUserData);
router.delete('/admin/user/:id', verifyToken, verifyAdmin, deleteUser);







module.exports = router;