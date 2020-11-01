import * as actionTypes from '../actions/actionTypes';

const initialState = {
	profiles: [],
	profile: null,
	error: {},
	loading: true,
	repos: []
};

const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.GET_PROFILES:
			return { ...state, profiles: payload, loading: false, profile: null, repos: [], error: {} };
		case actionTypes.GET_PROFILE:
			return { ...state, profile: payload, loading: false };
		case actionTypes.PROFILE_ERROR:
			return { ...state, error: payload, loading: false, repos: [], profile: null };
		case actionTypes.CLEAR_PROFILE:
			return { ...state, profile: null, error: {}, repos: [] };
		case actionTypes.CREATE_PROFILE:
			return { ...state, profile: payload, loading: false };
		case actionTypes.UPDATE_PROFILE:
			return { ...state, profile: payload, loading: false };
		case actionTypes.GITHUB_REPO:
			return { ...state, repos: payload, loading: false };

		default:
			return state;
	}
};

export default reducer;
