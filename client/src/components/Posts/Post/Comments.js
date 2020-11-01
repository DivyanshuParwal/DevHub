import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Moment from 'react-moment';

import { getPost, removeComment } from '../../../store/actions';
import Spinner from '../../Layout/Spinner/Spinner';

const Comments = ({ removeComment, userId, postId, getPost, posts: { post } }) => {
	useEffect(
		() => {
			getPost(postId);
		},
		[ getPost, postId ]
	);
	return (
		<Fragment>
			{post === null ? (
				<Spinner />
			) : (
				<div className="comments">
					{post.comments.map((comment) => {
						return (
							<div className="post bg-white p-1 my-1" key={comment._id}>
								<div>
									<Link to={`/profile/${comment.user}`}>
										<img className="round-img" src={comment.avatar} alt="" />
										<h4>{comment.name}</h4>
									</Link>
								</div>
								<div>
									<p className="my-1">{comment.text}</p>
									<p className="post-date">
										Posted on <Moment format="DD/MM/YYYY">{moment.utc(comment.date)}</Moment>
									</p>
									{comment.user === userId && (
										<button
											type="button"
											className="btn btn-danger"
											onClick={() => removeComment(post._id, comment._id)}
										>
											<i className="fas fa-times" />
										</button>
									)}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	posts: state.posts,
	userId: state.auth.user._id
});

export default connect(mapStateToProps, { getPost, removeComment })(Comments);
