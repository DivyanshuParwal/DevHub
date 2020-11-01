import React from 'react';
import { Switch } from 'react-router-dom';

import Landing from '../Layout/Landing';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Dashboard from '../Dashboard/Dashboard';
import ProfileForm from '../Dashboard/DashboardForms/ProfileForm';
import ExperienceForm from '../Dashboard/DashboardForms/ExperienceForm';
import EducationForm from '../Dashboard/DashboardForms/EducationForm';
import Developers from '../Profiles/Profiles';
import Profile from '../Profiles/Profile/Profile';
import Posts from '../Posts/Posts';
import Post from '../Posts/Post/Post';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import NotFound from '../Layout/NotFound';

const Routes = () => {
	return (
		<Switch>
			<PublicRoute path="/profiles" restricted={false} exact component={Developers} />
			<PublicRoute path="/profile/:user_id" restricted={false} exact component={Profile} />

			<PublicRoute path="/" restricted={true} exact component={Landing} />
			<PublicRoute path="/login" restricted={true} exact component={Login} />
			<PublicRoute path="/register" restricted={true} exact component={Register} />

			<PrivateRoute path="/dashboard" exact component={Dashboard} />
			<PrivateRoute path="/create-profile" exact component={ProfileForm} />
			<PrivateRoute path="/edit-profile" exact component={ProfileForm} />
			<PrivateRoute path="/add-experience" exact component={ExperienceForm} />
			<PrivateRoute path="/add-education" exact component={EducationForm} />
			<PrivateRoute path="/posts" exact component={Posts} />
			<PrivateRoute path="/post/:post_id" exact component={Post} />
			<PublicRoute restricted={false} component={NotFound} />
		</Switch>
	);
};

export default Routes;
