import { connect } from 'react-redux';
import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { createProfile } from '../../../store/actions';

const initialState = {
	company: '',
	website: '',
	location: '',
	status: '',
	skills: '',
	githubusername: '',
	bio: '',
	twitter: '',
	facebook: '',
	linkedin: '',
	youtube: '',
	instagram: ''
};

const ProfileForm = ({ createProfile, history, profile: { profile, loading } }) => {
	const [ formData, setFormData ] = useState(initialState);
	const [ displaySocialInputs, toggleSocialInputs ] = useState(false);

	useEffect(
		() => {
			if (!loading && profile) {
				const social = { ...profile.social };
				delete profile.social;
				const profileData = { ...profile, ...social };
				setFormData(profileData);
			}
		},
		[ loading, profile ]
	);
	const {
		company,
		website,
		location,
		status,
		skills,
		githubusername,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram
	} = formData;

	const inputChangedHandler = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		return setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		createProfile(formData, profile ? true : false, history);
	};

	return (
		<div className="container">
			<h1 className="large text-primary">{profile ? 'Edit Your Profile' : 'Create Your Profile'}</h1>
			<p className="lead">
				<i className="fas fa-user" />
				{profile ? (
					" Let's update some information to make your profile stand out"
				) : (
					" Let's get some information to make your profile stand out"
				)}
			</p>
			<small>* = required field</small>
			<form onSubmit={submitHandler} className="form">
				<div className="form-group">
					<select name="status" value={status} onChange={inputChangedHandler}>
						<option>* Select Professional Status</option>
						<option value="Developer">Developer</option>
						<option value="Junior Developer">Junior Developer</option>
						<option value="Senior Developer">Senior Developer</option>
						<option value="Manager">Manager</option>
						<option value="Student or Learning">Student or Learning</option>
						<option value="Instructor">Instructor or Teacher</option>
						<option value="Intern">Intern</option>
						<option value="Other">Other</option>
					</select>
					<small className="form-text">Give us an idea of where you are at in your career</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Company"
						name="company"
						onChange={inputChangedHandler}
						value={company}
					/>
					<small className="form-text">Could be your own company or one you work for</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Website"
						onChange={inputChangedHandler}
						value={website}
						name="website"
					/>
					<small className="form-text">Could be your own or a company website</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						onChange={inputChangedHandler}
						value={location}
						name="location"
					/>
					<small className="form-text">City & state suggested (eg. Mumbai,India)</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Skills"
						onChange={inputChangedHandler}
						value={skills}
						name="skills"
						required
					/>
					<small className="form-text">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Github Username"
						onChange={inputChangedHandler}
						value={githubusername}
						name="githubusername"
					/>
					<small className="form-text">
						If you want your latest repos and a Github link, include your username
					</small>
				</div>
				<div className="form-group">
					<textarea
						placeholder="A short bio of yourself"
						onChange={inputChangedHandler}
						value={bio}
						name="bio"
					/>
					<small className="form-text">Tell us a little about yourself</small>
				</div>

				<div className="my-2">
					<button
						onClick={() => toggleSocialInputs((prevState) => !prevState)}
						type="button"
						className="btn btn-light"
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>
				{displaySocialInputs && (
					<Fragment>
						<div className="form-group social-input">
							<i className="fab fa-twitter fa-2x" />
							<input
								type="text"
								placeholder="Twitter URL"
								onChange={inputChangedHandler}
								value={twitter}
								name="twitter"
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-facebook fa-2x" />
							<input
								type="text"
								placeholder="Facebook URL"
								onChange={inputChangedHandler}
								value={facebook}
								name="facebook"
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-youtube fa-2x" />
							<input
								type="text"
								placeholder="YouTube URL"
								onChange={inputChangedHandler}
								value={youtube}
								name="youtube"
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-linkedin fa-2x" />
							<input
								type="text"
								placeholder="Linkedin URL"
								onChange={inputChangedHandler}
								value={linkedin}
								name="linkedin"
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-instagram fa-2x" />
							<input
								type="text"
								placeholder="Instagram URL"
								onChange={inputChangedHandler}
								value={instagram}
								name="instagram"
							/>
						</div>
					</Fragment>
				)}
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { createProfile })(ProfileForm);
