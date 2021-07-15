const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getUsers)
router.get('/search', userController.getUserName)
router.get('/posts', userController.getAllPostsByUser)
router.get('/:id_user', userController.getUserById)
router.get('/:id_user/feed', userController.getFeed)
router.get('/:id_user/followers', userController.getFollowers)
router.get('/:id_user/following', userController.getFollowing)
router.post('/', userController.createUser)
router.post('/follow/:id_user', userController.followUser)
router.put('/:id_user', userController.updateUser)
router.delete('/:id_user', userController.deleteUserById)
router.delete('/unfollow/:id_user', userController.unfollowUser)


module.exports = router;
