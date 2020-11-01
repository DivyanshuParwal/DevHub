import axios from '../../axios-local';
import * as actionTypes from './actionTypes';
import { setAlert } from './alert';

export const logout = () => {
	return { type: actionTypes.LOGOUT };
};

export const getUser = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/auth');

		dispatch({
			type: actionTypes.GET_USER,
			payload: { user: res.data.user }
		});
	} catch (err) {
		dispatch({ type: actionTypes.AUTH_ERROR });
	}
};

export const register = (formData) => async (dispatch) => {
	try {
		const res = await axios.post('/api/users', formData);
		dispatch({
			type: actionTypes.REGISTER_SUCCESS,
			payload: { token: res.data.token }
		});
		dispatch(getUser());
	} catch (err) {
		dispatch(setAlert(err.response.data.message, 'danger'));
		dispatch({ type: actionTypes.REGISTER_FAIL });
	}
};

export const login = (formData) => async (dispatch) => {
	try {
		const res = await axios.post('/api/auth', formData);
		dispatch({
			type: actionTypes.LOGIN_SUCCESS,
			payload: { token: res.data.token }
		});
		dispatch(getUser());
	} catch (err) {
		dispatch(setAlert(err.response.data.message, 'danger'));
		dispatch({ type: actionTypes.LOGIN_FAIL });
	}
};
