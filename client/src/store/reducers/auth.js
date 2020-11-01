import * as actionTypes from '../actions/actionTypes';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	loading: true,
	user: null
};

const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.REGISTER_SUCCESS:
			return { ...state, ...payload, isAuthenticated: true, loading: false };
		case actionTypes.REGISTER_FAIL:
			return { ...state, loading: false, token: null };
		case actionTypes.LOGIN_SUCCESS:
			return { ...state, ...payload, isAuthenticated: true, loading: false };
		case actionTypes.LOGIN_FAIL:
			return { ...state, loading: false, token: null };
		case actionTypes.LOGOUT:
			return { ...state, isAuthenticated: false, user: null, token: null };
		case actionTypes.GET_USER:
			return { ...state, ...payload, isAuthenticated: true, loading: false };
		case actionTypes.AUTH_ERROR:
			return { ...state, loading: false, token: null, isAuthenticated: false };
		default:
			return state;
	}
};

export default reducer;
