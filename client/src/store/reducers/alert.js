import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case actionTypes.SET_ALERT:
			return [ ...state, payload ];
		case actionTypes.REMOVE_ALERT:
			return state.filter((alert) => alert.id !== payload);
		default:
			return state;
	}
};

export default reducer;
