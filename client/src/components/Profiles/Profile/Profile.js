import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { getProfileByUserId } from '../../../store/actions';
import Spinner from '../../Layout/Spinner/Spinner';
import ProfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
import ProfileGithub from './ProfileGithub';
import ProfileTop from './ProfileTop';

const Profile = ({
	match,
	getProfileByUserId,
	profile: { profile, error },
	auth: { isAuthenticated, loading, user }
}) => {
	useEffect(
		() => {
			getProfileByUserId(match.params.user_id);
		},
		[ getProfileByUserId, match.params.user_id ]
	);
	let spinner = <Spinner />;
	if (error.msg === 'Profile not found') spinner = <Redirect to="/posts" />;
	return (
		<Fragment>
			{profile === null ? (
				spinner
			) : (
				<div className="container">
					<Link to="/profiles" className="btn btn-light">
						Back To Profiles
					</Link>
					{isAuthenticated &&
					!loading &&
					user._id === profile.user._id && (
						<Link to="/edit-profile" className="btn btn-dark">
							Edit Profile
						</Link>
					)}
					<div className="profile-grid my-1">
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<ProfileExperience experiences={profile.experience} />
						<ProfileEducation education={profile.education} />
						<ProfileGithub githubUsername={profile.githubusername} />
					</div>
				</div>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfileByUserId })(Profile);
