const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getUsers)
router.get('/:id_user', userController.getUserById)
router.get('/feed/:id_user', userController.getFeed)
router.post('/', userController.createUser)
router.put('/:id_user', userController.updateUser)
router.delete('/:id_user', userController.deleteUser)

module.exports = router;
