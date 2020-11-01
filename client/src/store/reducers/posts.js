import * as actionTypes from '../actions/actionTypes';

const initialState = {
	error: {},
	posts: [],
	post: null,
	loading: true,
	likes: []
};

const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.CREATE_POST:
			return { ...state, loading: false, post: payload };
		case actionTypes.POST_ERROR:
			return { ...state, error: payload, loading: false };
		case actionTypes.GET_POSTS:
			return { ...state, posts: payload, loading: false };
		case actionTypes.GET_POST:
			return { ...state, post: payload, loading: false };

		default:
			return state;
	}
};

export default reducer;
