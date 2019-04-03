/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Debug from 'debug';

let debug = Debug('AuthRoute');

function authenticateRoute() {
	debug('authenticateRoute, called');
	let result = false;

	$.ajax('/authenticate', {async: false})
		.done(() => {
			debug('authenticateRoute, auth ok');
			result = true;
		})
		.fail(() => {
			result = false;
		});

	return result;
}

export const AuthRoute = ({component: Component, ...rest}) => (
	<Route {...rest} render={(props) => (
		authenticateRoute()
			? (<Component {...props} />)
			: (<Redirect to={{ pathname: '/login', state: { from: props.location}}} />)
	)} />
);
