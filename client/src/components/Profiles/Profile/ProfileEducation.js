import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileEducation = ({ education }) => {
	return (
		<Fragment>
			<div className="profile-edu bg-white p-2">
				{education.length > 0 ? (
					<Fragment>
						<h2 className="text-primary">Education</h2>
						{education.map((edu) => {
							return (
								<Fragment key={edu._id}>
									<h3>{edu.school}</h3>
									<p>
										<Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> -{' '}
										{!edu.to ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>}
									</p>{' '}
									<p>
										<strong>Degree: </strong>
										{edu.degree}
									</p>
									<p>
										{edu.fieldOfStudy && <strong>Field Of Study: </strong>}
										{edu.fieldOfStudy}
									</p>
									<p>
										{edu.description && <strong>Description: </strong>}
										{edu.description}
									</p>
								</Fragment>
							);
						})}
					</Fragment>
				) : (
					<h4>No education information</h4>
				)}
			</div>
		</Fragment>
	);
};

export default ProfileEducation;
