/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Debug from 'debug';

let debug = Debug('AuthRoute');

class AuthRoute extends Route {
	render() {<Route {...rest} render={(props) => (
		isAuthenticated()
			? (<Component {...props} />)
			: (<Redirect to={{ pathname: '/login', state: { from: props.location}}} />)
	)} />}
};

LoginView.propTypes = {
	isworking:	PropTypes.bool,
	loggedin:	PropTypes.bool,
	err:		PropTypes.string,

	authenticate:		PropTypes.func
};

export default AuthRoute;
/*
function isAuthenticated() {
	debug('isAuthenticated, called');
	let result = false;

	$.ajax('/authenticate', {async: false})
		.done(() => {
			debug('isAuthenticated, auth ok');
			result = true;
		})
		.fail(() => {
			result = false;
		});

	return result;
}

export const AuthRoute = ({component: Component, ...rest}) => (
	<Route {...rest} render={(props) => (
		isAuthenticated()
			? (<Component {...props} />)
			: (<Redirect to={{ pathname: '/login', state: { from: props.location}}} />)
	)} />
);
*/
