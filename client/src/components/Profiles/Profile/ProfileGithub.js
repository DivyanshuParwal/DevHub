import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { getGithubRepos } from '../../../store/actions';

const ProfileGithub = ({ getGithubRepos, githubUsername, repos }) => {
	useEffect(
		() => {
			if (githubUsername !== '') {
				getGithubRepos(githubUsername);
			}
		},
		[ getGithubRepos, githubUsername ]
	);
	return (
		<Fragment>
			<div className="profile-github">
				<h2 className="text-primary my-1">
					<i className="fab fa-github" /> Github Repos
				</h2>
				{repos.length > 0 ? (
					repos.map((repo) => {
						return (
							<div className="repo bg-white p-1 my-1" key={repo.id}>
								<div>
									<h4>
										<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
											{repo.full_name}
										</a>
									</h4>
									<p>{repo.description}</p>
								</div>
								<div>
									<ul>
										<li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
										<li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
										<li className="badge badge-light">Forks: {repo.forks_count}</li>
									</ul>
								</div>
							</div>
						);
					})
				) : (
					<div className="repo bg-white p-1 my-1">
						<h4>No github repos</h4>{' '}
					</div>
				)}
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	repos: state.profile.repos
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
