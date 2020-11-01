import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import profile from './profile';
import posts from './posts';

const rootReducer = combineReducers({
	alert,
	auth,
	profile,
	posts
});

export default rootReducer;
