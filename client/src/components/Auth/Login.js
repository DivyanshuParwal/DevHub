import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { login } from '../../store/actions';

const Login = ({ login, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const inputChangedHandler = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		return setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		login(formData);
	};
	return (
		<div className="container">
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead">
				<i className="fas fa-user" /> Sign Into Your Account
			</p>
			<form className="form" onSubmit={submitHandler}>
				<div className="form-group">
					<input
						onChange={inputChangedHandler}
						value={email}
						type="email"
						placeholder="Email Address"
						name="email"
						required
					/>
				</div>
				<div className="form-group">
					<input
						onChange={inputChangedHandler}
						value={password}
						type="password"
						placeholder="Password"
						name="password"
						minLength="6"
						required
					/>
				</div>

				<input type="submit" className="btn btn-primary" value="Login" />
			</form>
			<p className="my-1">
				Don't have an account? <Link to="/register">Sign Up</Link>
			</p>
		</div>
	);
};

export default connect(null, { login })(Login);
