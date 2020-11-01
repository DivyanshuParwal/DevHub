import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actionCreators from '../../store/actions';

const Navbar = ({ isAuthenticated, logout, clearProfile }) => {
	const logoutHandler = () => {
		logout();
		clearProfile();
	};
	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to={isAuthenticated ? '/dashboard' : '/'}>
					<i className="fas fa-laptop-code" /> DevHub
				</Link>
			</h1>
			<ul>
				<li>
					<Link to="/profiles">
						<i className="fas fa-users" /> Developers
					</Link>
				</li>
				{isAuthenticated ? (
					<Fragment>
						<li>
							<Link to="/posts">
								<i className="fas fa-blog" /> Posts
							</Link>
						</li>
						<li>
							<Link to="/dashboard">
								<i className="fas fa-id-card-alt" /> Dashboard
							</Link>
						</li>
						<li>
							<Link to="/" onClick={logoutHandler}>
								<i className="fas fa-sign-out-alt" /> Logout
							</Link>
						</li>
					</Fragment>
				) : (
					<Fragment>
						<li>
							<Link to="/register">
								<i className="fas fa-user-plus" /> Register
							</Link>
						</li>
						<li>
							<Link to="/login">
								<i className="fas fa-sign-in-alt" /> Login
							</Link>
						</li>
					</Fragment>
				)}
			</ul>
		</nav>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(actionCreators.logout()),
	clearProfile: () => dispatch(actionCreators.clearProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
