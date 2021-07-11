const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/', postController.createPost)
router.get('/:id_post', postController.getPostById)

module.exports = router;
