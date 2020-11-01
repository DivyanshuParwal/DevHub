import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../store/actions';

const Posts = ({ createPost }) => {
	const [ formData, setFormData ] = useState({ text: '' });
	const inputChangedHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const { text } = formData;

	const submitHandler = (e) => {
		e.preventDefault();
		createPost(formData);
	};

	return (
		<Fragment>
			<h1 className="large text-primary">Posts</h1>
			<p className="lead">
				<i className="fas fa-user" /> Welcome to the community!
			</p>

			<div className="post-form">
				<div className="bg-primary p">
					<h3>Say Something...</h3>
				</div>
				<form className="form my-1" onSubmit={submitHandler}>
					<textarea
						name="text"
						value={text}
						onChange={inputChangedHandler}
						cols="30"
						rows="5"
						placeholder="Create a post"
						required
					/>
					<input type="submit" className="btn btn-dark my-1" value="Submit" />
				</form>
			</div>
		</Fragment>
	);
};

export default connect(null, { createPost })(Posts);
