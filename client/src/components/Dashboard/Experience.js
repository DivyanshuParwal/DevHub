import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

import { deleteExperience } from '../../store/actions';
import { connect } from 'react-redux';

const Experience = ({ experience, deleteExperience }) => {
	return (
		<Fragment>
			<h2 className="my-2">Experience Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th className="hide-sm">Title</th>
						<th className="hide-sm">Years</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{experience.map((exp) => {
						return (
							<tr key={exp._id}>
								<td>{exp.company}</td>
								<td className="hide-sm">{exp.title}</td>
								<td className="hide-sm">
									<Moment format="DD/MM/YYYY">{moment.utc(exp.from)}</Moment> -{' '}
									{exp.to === null ? (
										' Now'
									) : (
										<Moment format="DD/MM/YYYY">{moment.utc(exp.to)}</Moment>
									)}
								</td>
								<td>
									<button className="btn btn-danger" onClick={() => deleteExperience(exp._id)}>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</Fragment>
	);
};

export default connect(null, { deleteExperience })(Experience);
