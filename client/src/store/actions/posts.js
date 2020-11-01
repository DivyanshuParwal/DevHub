import * as actionTypes from './actionTypes';
import axios from '../../axios-local';
import { setAlert } from './alert';

export const createPost = (postData) => async (dispatch) => {
	try {
		const res = await axios.post('/posts/user/post', postData);
		dispatch({ type: actionTypes.CREATE_POST, payload: res.data });
		dispatch(getPosts());
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
	}
};

export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/posts');
		dispatch({ type: actionTypes.GET_POSTS, payload: res.data });
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
	}
};

export const getPost = (post_id) => async (dispatch) => {
	try {
		const res = await axios.get(`/posts/user/post/${post_id}`);
		dispatch({ type: actionTypes.GET_POST, payload: res.data });
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
	}
};

export const deletePost = (post_id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/posts/user/post/${post_id}`);
		dispatch(getPosts());
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
	}
};

export const addLike = (post_id) => async (dispatch) => {
	try {
		await axios.put(`/posts/user/post/like/${post_id}`);
		dispatch(getPosts());
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
		dispatch(setAlert(err.response.data.message, 'danger'));
	}
};

export const removeLike = (post_id) => async (dispatch) => {
	try {
		await axios.delete(`/posts/user/post/like/${post_id}`);
		dispatch(getPosts());
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
		dispatch(setAlert(err.response.data.message, 'danger'));
	}
};

export const createComment = (post_id, commentData) => async (dispatch) => {
	try {
		const res = await axios.put(`/posts/user/post/comment/${post_id}`, commentData);
		dispatch({ type: actionTypes.GET_POST, payload: res.data });
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
		dispatch(setAlert(err.response.data.message, 'danger'));
	}
};

export const removeComment = (post_id, comment_id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/posts/user/post/comment/${post_id}/${comment_id}`);
		dispatch({ type: actionTypes.GET_POST, payload: res.data });
		dispatch(setAlert('Comment removed', 'success'));
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
		dispatch(setAlert(err.response.data.message, 'danger'));
	}
};
