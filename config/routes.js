const router = require('express').Router();
const controllers = require('../app/controllers');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

const prefix = '/api/v1';

//user api
// router.get(prefix + '/users', controllers.authControllers.getAllUsers);

//transactions api
router.get(prefix + "/trans", controllers.transController.getAllTrans)
router.get(prefix + "/trans/:id", controllers.transController.getTransByUserId)
router.post(prefix + "/trans", controllers.transController.createTrans)
router.delete(prefix + "/trans/:id", controllers.transController.deleteTransById)
router.put(prefix + "/trans/:id", controllers.transController.getTransByUserId)

module.exports = router;