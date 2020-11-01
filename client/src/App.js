import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Navbar from './components/Layout/Navbar';
import Alert from './components/Layout/Alert';
import Routes from './components/Routes/Routes';
import { getUser, logout } from './store/actions';
import setAuthToken from './utils/setAuthToken';

const App = ({ getUser, logout }) => {
	useEffect(
		() => {
			if (localStorage.token) {
				setAuthToken(localStorage.token);
			}
			getUser();

			window.addEventListener('storage', () => {
				if (!localStorage.token) logout();
			});
		},
		[ getUser, logout ]
	);
	return (
		<Fragment>
			<Navbar />
			<Alert />
			<Routes />
		</Fragment>
	);
};

export default connect(null, { getUser, logout })(App);
