const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/posts/searchTag', postController.getAllWithTag)
router.get('/posts/', postController.getAllPosts)
router.post('/posts/', postController.createPost)
router.post('/posts/:id_post/comment', postController.commentPost)
router.get('/posts/:id_post', postController.getPostById)
router.delete('/posts/:id_post/comment', postController.deleteComment)
router.delete('/comment/:id_comment', postController.deleteComment)
router.delete('/posts/:id_post', postController.deleteById)

module.exports = router;
