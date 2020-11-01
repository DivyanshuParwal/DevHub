import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createComment } from '../../../store/actions';

const CommentForm = ({ createComment, postId }) => {
	const [ formData, setFormData ] = useState({ text: '' });
	const inputChangedHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const { text } = formData;

	const submitHandler = (e) => {
		e.preventDefault();
		createComment(postId, formData);
	};
	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Leave A Comment</h3>
			</div>
			<form className="form my-1" onSubmit={submitHandler}>
				<textarea
					name="text"
					value={text}
					onChange={inputChangedHandler}
					cols="30"
					rows="5"
					placeholder="Comment on this post"
					required
				/>
				<input type="submit" className="btn btn-dark my-1" value="Submit" />
			</form>
		</div>
	);
};

export default connect(null, { createComment })(CommentForm);
