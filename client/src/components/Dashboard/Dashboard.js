import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProfile, deleteAccount } from '../../store/actions';
import Spinner from '../Layout/Spinner/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getProfile, deleteAccount, history, profile: { profile, loading }, auth: { user } }) => {
	useEffect(
		() => {
			getProfile();
		},
		[ getProfile ]
	);

	const deleteAccountHandler = () => deleteAccount(history);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<div className="container">
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user" /> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
					<div className="my-2">
						<button className="btn btn-danger" onClick={deleteAccountHandler}>
							<i className="fas fa-user-minus" /> Delete My Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet setup a profile, please add some info</p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						Create Profile
					</Link>
				</Fragment>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfile, deleteAccount })(Dashboard);
