import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<Fragment>
			<div className="landing">
				<div className="dark-overlay">
					<div className="landing-inner">
						<h1 className="x-large">Developer Hub</h1>
						<p className="lead">
							Create a developer profile/portfolio, share posts and get help from other developers
						</p>
						<div className="buttons">
							<Link to="/register" className="btn btn-primary">
								Sign Up
							</Link>
							<Link to="/login" className="btn btn-light">
								Login
							</Link>
						</div>
					</div>
				</div>
			</div>
			<footer className="footer bg-dark">
				<i className="far fa-copyright" /> <span>2020 DevHub</span>
			</footer>
		</Fragment>
	);
};

export default Landing;
