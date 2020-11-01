import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../Layout/Spinner/Spinner';
import { getProfiles } from '../../store/actions';

const Profiles = ({ getProfiles, profiles, loading }) => {
	useEffect(
		() => {
			getProfiles();
		},
		[ getProfiles ]
	);

	const profilesArray = (
		<div className="profiles">
			{profiles.map((profile) => {
				return (
					<Fragment key={profile._id}>
						<div className="profile bg-light">
							<img className="round-img" src={profile.user.avatar} alt="" />
							<div>
								<h2>{profile.user.name}</h2>
								<p>
									{profile.status} {profile.company && `at ${profile.company}`}
								</p>
								<p>{profile.location}</p>
								<Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
									View Profile
								</Link>
							</div>

							<ul>
								{profile.skills.slice(0, 4).map((skill, index) => {
									return (
										<li key={index} className="text-primary">
											<i className="fas fa-check" /> {skill}
										</li>
									);
								})}
							</ul>
						</div>
					</Fragment>
				);
			})}
		</div>
	);
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<div className="container">
					<h1 className="large text-primary">Developers</h1>
					<p className="lead">
						<i className="fab fa-connectdevelop" /> Browse and connect with developers
					</p>
					{profiles.length > 0 ? profilesArray : <h4>No profiles found...</h4>}
				</div>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	profiles: state.profile.profiles,
	loading: state.profile.loading
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
