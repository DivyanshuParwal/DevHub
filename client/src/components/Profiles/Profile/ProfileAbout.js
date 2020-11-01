import React, { Fragment } from 'react';

const ProfileAbout = ({ profile: { bio, skills, user } }) => {
	return (
		<Fragment>
			<div className="profile-about bg-light p-2">
				<h2 className="text-primary">{user.name && user.name.trim().split(' ')[0]}'s Bio</h2>
				<p>{bio}</p>
				<div className="line" />
				<h2 className="text-primary">Skill Set</h2>
				<div className="skills">
					{skills.map((skill, index) => {
						return (
							<div key={index} className="p-1">
								<i className="fa fa-check" /> {skill}
							</div>
						);
					})}
				</div>
			</div>
		</Fragment>
	);
};

export default ProfileAbout;
