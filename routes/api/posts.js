const express = require('express');

const auth = require('../../middleware/auth');
const posts = require('../../controllers/posts');
const { check } = require('express-validator');

const router = express.Router();

router.get('/user/post/:post_id', auth, posts.getPost);

router.get('/', auth, posts.getPosts);

router.post('/user/post', [ auth, [ check('text').notEmpty() ] ], posts.createPost);

router.put('/user/post/like/:post_id', auth, posts.addLike);

router.put('/user/post/comment/:post_id', [ auth, [ check('text').notEmpty() ] ], posts.addComment);

router.delete('/user/post/:post_id', auth, posts.deletePost);

router.delete('/user/post/like/:post_id', auth, posts.removeLike);

router.delete('/user/post/comment/:post_id/:comment_id', auth, posts.removeComment);

module.exports = router;
