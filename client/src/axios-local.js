import axios from 'axios';
import store from './store/store';
import { logout } from './store/actions';

const instance = axios.create({
	baseURL: `${process.env.BASEURL || 'http://localhost:5000'}/api`
});

instance.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err.response.status === 401) {
			store.dispatch(logout());
		}
		return Promise.reject(err);
	}
);

export default instance;
