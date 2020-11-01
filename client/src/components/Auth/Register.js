import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setAlert, register } from '../../store/actions';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password1: '',
		password2: ''
	});

	const { name, email, password1, password2 } = formData;

	const inputChangedHandler = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		return setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (password1 !== password2) {
			return setAlert('Passwords do not match', 'danger');
		}
		const formData = {
			email,
			name,
			password: password1
		};
		register(formData);
	};

	return (
		<div className="container">
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<i className="fas fa-user" /> Create Your Account
			</p>
			<form className="form" onSubmit={submitHandler}>
				<div className="form-group">
					<input
						onChange={inputChangedHandler}
						value={name}
						type="text"
						placeholder="Name"
						name="name"
						required
					/>
				</div>
				<div className="form-group">
					<input
						onChange={inputChangedHandler}
						value={email}
						type="email"
						placeholder="Email Address"
						name="email"
						required
					/>
					<small className="form-text">
						This site uses Gravatar so if you want a profile image, use a Gravatar email
					</small>
				</div>
				<div className="form-group">
					<input
						onChange={inputChangedHandler}
						value={password1}
						type="password"
						placeholder="Password"
						name="password1"
						minLength="6"
						required
					/>
				</div>
				<div className="form-group">
					<input
						onChange={inputChangedHandler}
						value={password2}
						type="password"
						placeholder="Confirm Password"
						name="password2"
						minLength="6"
						required
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</div>
	);
};

export default connect(null, { setAlert, register })(Register);
