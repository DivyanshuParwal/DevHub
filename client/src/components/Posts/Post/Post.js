import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from '../../../store/actions';
import Spinner from '../../Layout/Spinner/Spinner';

import CommentForm from './CommentForm';
import Comments from './Comments';

const Post = ({ match, getPost, posts: { post } }) => {
	useEffect(
		() => {
			getPost(match.params.post_id);
		},
		[ getPost, match.params.post_id ]
	);
	return (
		<Fragment>
			{post === null ? (
				<Spinner />
			) : (
				<div className="container">
					<Link to="/posts" className="btn">
						Back To Posts
					</Link>
					<div className="post bg-white p-1 my-1">
						<div>
							<Link to={`/profile/${post.user}`}>
								<img className="round-img" src={post.avatar} alt="" />
								<h4>{post.name}</h4>
							</Link>
						</div>
						<div>
							<p className="my-1">{post.text}</p>
						</div>
					</div>

					<CommentForm postId={match.params.post_id} />
					<Comments postId={match.params.post_id} />
				</div>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	posts: state.posts
});

export default connect(mapStateToProps, { getPost })(Post);
