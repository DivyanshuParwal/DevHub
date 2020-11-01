const { validationResult } = require('express-validator');

const Post = require('../models/Post');
const HttpError = require('../models/Http-error');
const User = require('../models/User');

const getPosts = async (req, res, next) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		next(new HttpError(err.message, 500));
	}
};

const getPost = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.post_id);
		res.json(post);
	} catch (err) {
		next(new HttpError(err.message, 500));
	}
};

const createPost = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid inputs passed. Please check your data', 400));
	}

	try {
		const user = await User.findById(req.user.id).select('-password');

		const newPost = {
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			user: user._id.toString()
		};

		const post = await Post.create(newPost);
		res.json(post);
	} catch (err) {
		next(new HttpError(err.message, 500));
	}
};

const deletePost = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.post_id);

		if (!post) return next(new HttpError('Post not found', 404));
		if (post.user.toString() !== req.user.id) {
			return next(new HttpError('User not authorized', 401));
		}

		await post.remove();
		res.json({ msg: 'Post Deleted' });
	} catch (err) {
		next(new HttpError(err.message, 500));
	}
};

const addLike = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.post_id);
		const isLiked = post.likes.filter((like) => like.user.toString() === req.user.id);
		if (isLiked.length === 0) {
			post.likes.push({ user: req.user.id });

			await post.save();
			res.json(post);
		} else {
			next(new HttpError('Post already liked', 400));
		}
	} catch (err) {
		next(new HttpError(err.message, 500));
	}
};

const removeLike = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.post_id);
		const isLiked = post.likes.filter((like) => like.user.toString() === req.user.id);
		if (isLiked.length === 0) {
			return next(new HttpError('Post has not yet been liked', 400));
		}
		post.likes = post.likes.filter((like) => like.user.toString() !== req.user.id);

		await post.save();
		res.json(post.likes);
	} catch (err) {
		next(new HttpError(err.message, 500));
	}
};

const addComment = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid inputs passed. Please check your data', 400));
	}

	try {
		const post = await Post.findById(req.params.post_id);
		const user = await User.findById(req.user.id).select('-password');

		post.comments.unshift({
			user: req.user.id,
			text: req.body.text,
			name: user.name,
			avatar: user.avatar
		});

		await post.save();
		res.json(post);
	} catch (err) {
		next(new HttpError(err.message, 500));
	}
};

const removeComment = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.post_id);
		const comment = post.comments.find((comment) => comment.id === req.params.comment_id);
		if (comment.user.toString() !== req.user.id) {
			return next(new HttpError('User not authorized', 401));
		}

		post.comments = post.comments.filter((comment) => comment.id !== req.params.comment_id);

		await post.save();
		res.json(post);
	} catch (err) {
		next(new HttpError(err.message, 500));
	}
};

exports.getPost = getPost;
exports.createPost = createPost;
exports.deletePost = deletePost;
exports.getPosts = getPosts;
exports.addLike = addLike;
exports.addComment = addComment;
exports.removeComment = removeComment;
exports.removeLike = removeLike;
