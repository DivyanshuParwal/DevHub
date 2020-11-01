import axios from '../../axios-local';
import * as actionTypes from './actionTypes';
import * as actionCreators from '../actions';

export const getProfiles = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profiles');
		dispatch({ type: actionTypes.GET_PROFILES, payload: res.data });
	} catch (err) {
		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
	}
};

export const getProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profiles/user/profile');
		dispatch({ type: actionTypes.GET_PROFILE, payload: res.data });
	} catch (err) {
		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
	}
};

export const clearProfile = () => ({
	type: actionTypes.CLEAR_PROFILE
});

//Create or Update Profile
export const createProfile = (profileData, edit, history) => async (dispatch) => {
	try {
		const res = await axios.post('/api/profiles/user/profile', profileData);
		dispatch({ type: actionTypes.CREATE_PROFILE, payload: res.data });
		history.goBack();
		dispatch(actionCreators.setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
	} catch (err) {
		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
		dispatch(actionCreators.setAlert(err.response.data.message, 'danger'));
	}
};

export const addExperience = (expData, history) => async (dispatch) => {
	try {
		const res = await axios.put('/api/profiles/user/profile/experience', expData);
		dispatch({ type: actionTypes.UPDATE_PROFILE, payload: res.data });
		history.push('/dashboard');
		dispatch(actionCreators.setAlert('New Experience Added', 'success'));
	} catch (err) {
		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
		dispatch(actionCreators.setAlert(err.response.data.message, 'danger'));
	}
};

export const addEducation = (eduData, history) => async (dispatch) => {
	try {
		const res = await axios.put('/api/profiles/user/profile/education', eduData);
		dispatch({ type: actionTypes.UPDATE_PROFILE, payload: res.data });
		history.push('/dashboard');
		dispatch(actionCreators.setAlert('New Education Added', 'success'));
	} catch (err) {
		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
		dispatch(actionCreators.setAlert(err.response.data.message, 'danger'));
	}
};

export const deleteExperience = (experience_id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profiles//user/profile/experience/${experience_id}`);
		dispatch({ type: actionTypes.UPDATE_PROFILE, payload: res.data });
		dispatch(actionCreators.setAlert('Experience removed', 'success'));
	} catch (err) {
		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
		dispatch(actionCreators.setAlert(err.response.data.message, 'danger'));
	}
};

export const deleteEducation = (education_id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profiles//user/profile/education/${education_id}`);
		dispatch({ type: actionTypes.UPDATE_PROFILE, payload: res.data });
		dispatch(actionCreators.setAlert('Education removed', 'success'));
	} catch (err) {
		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
		dispatch(actionCreators.setAlert(err.response.data.message, 'danger'));
	}
};

export const deleteAccount = (history) => async (dispatch) => {
	if (window.confirm('Are you sure? This can not be undone!')) {
		try {
			await axios.delete('/api/profiles/user/profile');

			dispatch(actionCreators.logout());
			dispatch(clearProfile());

			dispatch(actionCreators.setAlert('Your account has been permanently deleted'));
		} catch (err) {
			dispatch({
				type: actionTypes.PROFILE_ERROR,
				payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
			});
			dispatch(actionCreators.setAlert(err.response.data.message, 'danger'));
		}
	}
};

export const getProfileByUserId = (user_id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profiles/profile/${user_id}`);
		dispatch({ type: actionTypes.UPDATE_PROFILE, payload: res.data });
	} catch (err) {
		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
		dispatch(actionCreators.setAlert(err.response.data.message, 'danger'));
	}
};

export const getGithubRepos = (githubUsername) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profiles/user/github/${githubUsername}`);
		dispatch({ type: actionTypes.GITHUB_REPO, payload: res.data });
	} catch (err) {
		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: { msg: err.response.data.message, statusCode: err.response.data.statusCode }
		});
		dispatch(actionCreators.setAlert(err.response.data.message, 'danger'));
	}
};
