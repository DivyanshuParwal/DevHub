import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addEducation } from '../../../store/actions';

const EducationForm = ({ addEducation, history }) => {
	const initialState = {
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: ''
	};
	const [ formData, setFormData ] = useState(initialState);
	const { school, degree, fieldofstudy, from, to, description, current } = formData;

	const inputChangedHandler = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		return setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
	};
	const submitHandler = (e) => {
		e.preventDefault();
		addEducation(formData, history);
	};
	return (
		<div className="container">
			<h1 className="large text-primary">Add Your Education</h1>
			<p className="lead">
				<i className="fas fa-graduation-cap" /> Add any school, bootcamp, etc that you have attended
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={submitHandler}>
				<div className="form-group">
					<input
						type="text"
						placeholder="* School or Bootcamp"
						onChange={inputChangedHandler}
						value={school}
						name="school"
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Degree or Certificate"
						onChange={inputChangedHandler}
						value={degree}
						name="degree"
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Field Of Study"
						onChange={inputChangedHandler}
						value={fieldofstudy}
						name="fieldofstudy"
						required
					/>
				</div>
				<div className="form-group">
					<h4>* From Date</h4>
					<input type="date" onChange={inputChangedHandler} value={from} name="from" required />
				</div>
				<div className="form-group">
					<p>
						<input
							type="checkbox"
							onChange={() => {
								setFormData((prevFormData) => ({ ...prevFormData, current: !prevFormData.current }));
							}}
							value={current}
							name="current"
							checked={current}
						/>{' '}
						Current School or Bootcamp
					</p>
				</div>
				<div className="form-group">
					<h4>{current ? 'To Date' : '* To Date'}</h4>
					<input
						type="date"
						onChange={inputChangedHandler}
						value={to}
						name="to"
						disabled={current}
						required={current}
					/>
				</div>
				<div className="form-group">
					<textarea
						onChange={inputChangedHandler}
						value={description}
						name="description"
						cols="30"
						rows="5"
						placeholder="Program Description"
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

export default connect(null, { addEducation })(EducationForm);
