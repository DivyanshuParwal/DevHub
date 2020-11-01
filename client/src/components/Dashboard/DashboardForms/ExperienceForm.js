import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addExperience } from '../../../store/actions';

const ExperienceForm = ({ addExperience, history }) => {
	const initialState = {
		title: '',
		company: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: ''
	};
	const [ formData, setFormData ] = useState(initialState);
	const { company, title, location, from, to, current, description } = formData;

	const inputChangedHandler = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		return setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		addExperience(formData, history);
	};
	return (
		<div className="container">
			<h1 className="large text-primary">Add An Experience</h1>
			<p className="lead">
				<i className="fas fa-code-branch" /> Add any developer/programming positions that you have had in the
				past
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={submitHandler}>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Job Title"
						name="title"
						onChange={inputChangedHandler}
						value={title}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Company"
						name="company"
						onChange={inputChangedHandler}
						value={company}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						onChange={inputChangedHandler}
						value={location}
					/>
				</div>
				<div className="form-group">
					<h4>* From Date</h4>
					<input type="date" name="from" onChange={inputChangedHandler} value={from} required />
				</div>
				<div className="form-group">
					<p>
						<input
							type="checkbox"
							name="current"
							checked={current}
							value={current}
							onChange={() => {
								setFormData((prevFormData) => ({ ...prevFormData, current: !prevFormData.current }));
							}}
						/>{' '}
						Current Job
					</p>
				</div>
				<div className="form-group">
					<h4>{current ? 'To Date' : '* To Date'}</h4>
					<input
						type="date"
						name="to"
						onChange={inputChangedHandler}
						value={to}
						disabled={current}
						required={current}
					/>
				</div>
				<div className="form-group">
					<textarea
						name="description"
						onChange={inputChangedHandler}
						value={description}
						cols="30"
						rows="5"
						placeholder="Job Description"
					/>
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</div>
	);
};

export default connect(null, { addExperience })(ExperienceForm);
