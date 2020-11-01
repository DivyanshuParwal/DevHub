import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileExperience = ({ experiences }) => {
	return (
		<Fragment>
			<div className="profile-exp bg-white p-2">
				{experiences.length > 0 ? (
					<Fragment>
						<h2 className="text-primary">Experience</h2>
						{experiences.map((exp) => {
							return (
								<Fragment key={exp._id}>
									<h3 className="text-dark">{exp.company}</h3>
									<p>
										<Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{' '}
										{!exp.to ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>}
									</p>
									<p>
										<strong>Position: </strong>
										{exp.title}
									</p>
									<p>
										{exp.location && <strong>Location: </strong>} {exp.location}
									</p>
									<p>
										{exp.description && <strong>Description: </strong>}
										{exp.description}
									</p>
								</Fragment>
							);
						})}
					</Fragment>
				) : (
					<h4>No experience information</h4>
				)}
			</div>
		</Fragment>
	);
};

export default ProfileExperience;
