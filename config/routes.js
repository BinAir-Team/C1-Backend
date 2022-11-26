const router = require('express').Router();
const controllers = require('../app/controllers');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

const prefix = '/api/v1';

//user api
// router.get(prefix + '/users', controllers.authControllers.getAllUsers);

//ticket api
router.get(prefix + "/ticket", controllers.transController.getAllTrans)
router.get(prefix + "/ticket/:id", controllers.transController.getTransByUserId)
router.post(prefix + "/ticket", controllers.transController.createTrans)
router.delete(prefix + "/ticket/:id", controllers.transController.deleteTransById)
router.put(prefix + "/ticket/:id", controllers.transController.getTransByUserId)

module.exports = router;