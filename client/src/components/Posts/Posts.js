import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Moment from 'react-moment';

import { getPosts, deletePost, addLike, removeLike } from '../../store/actions';
import PostForm from './PostForm';

const Posts = ({ removeLike, addLike, userId, deletePost, getPosts, posts: { posts } }) => {
	useEffect(
		() => {
			getPosts();
		},
		[ getPosts ]
	);
	return (
		<div className="container">
			<PostForm />

			<div className="posts">
				{posts.map((post) => {
					return (
						<div className="post bg-white p-1 my-1" key={post._id}>
							<div>
								<Link to={`/profile/${post.user}`}>
									<img className="round-img" src={post.avatar} alt="" />
									<h4>{post.name}</h4>
								</Link>
							</div>
							<div>
								<p className="my-1">{post.text}</p>
								<p className="post-date">
									Posted on <Moment format="DD/MM/YYYY">{moment.utc(post.date)}</Moment>
								</p>
								<button type="button" className="btn btn-light" onClick={() => addLike(post._id)}>
									<i className="fas fa-thumbs-up" />
									<span>{post.likes.length}</span>
								</button>
								<button type="button" className="btn btn-light" onClick={() => removeLike(post._id)}>
									<i className="fas fa-thumbs-down" />
								</button>
								<Link to={`/post/${post._id}`} className="btn btn-primary">
									Discussion <span className="comment-count">{post.comments.length}</span>
								</Link>
								{post.user === userId && (
									<button
										type="button"
										className="btn btn-danger"
										onClick={() => deletePost(post._id)}
									>
										<i className="fas fa-times" />
									</button>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	posts: state.posts,
	userId: state.auth.user._id
});

export default connect(mapStateToProps, { getPosts, deletePost, addLike, removeLike })(Posts);
