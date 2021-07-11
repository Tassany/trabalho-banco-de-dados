const express = require('express');
const userController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', userController.signUp);
router.get('/', userController.signIn);

module.exports = router;
