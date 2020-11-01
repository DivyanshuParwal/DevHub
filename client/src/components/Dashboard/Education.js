import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';

import { deleteEducation } from '../../store/actions';

const Education = ({ education, deleteEducation }) => {
	return (
		<Fragment>
			<h2 className="my-2">Education Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>School</th>
						<th className="hide-sm">Degree</th>
						<th className="hide-sm">Years</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{education.map((edu) => {
						return (
							<tr key={edu._id}>
								<td>{edu.school}</td>
								<td className="hide-sm">{edu.degree}</td>
								<td className="hide-sm">
									<Moment format="DD/MM/YYYY">{moment.utc(edu.from)}</Moment> -{' '}
									{edu.to === null ? (
										' Now'
									) : (
										<Moment format="DD/MM/YYYY">{moment.utc(edu.to)}</Moment>
									)}
								</td>
								<td>
									<button className="btn btn-danger" onClick={() => deleteEducation(edu._id)}>
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

export default connect(null, { deleteEducation })(Education);
