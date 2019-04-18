/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import fetch from 'cross-fetch';
import { coreInit, fetchOk } from './service_utils';
import Debug from 'debug';

let debug = Debug('auth_servcies');

export const signup = (firstName, lastName, organisation, email, password) => {
	debug('signup, called.');

	let init = {
		...coreInit,
		method:			'POST',
		body:			JSON.stringify({'firstName': firstName, 'lastName': lastName,
			'organisation': organisation, 'email': email, 'password': password})
	};

	debug('signup, init is: ' + JSON.stringify(init));
	return fetchOk('/signup', init)
		.then((response) => {debug('signup, response ok.');return response;})
		.catch((error) => {debug('signup, fetch, caught err.'); throw error;});

};


export const login = (email, password) => {
	debug('login, called.');

	let init = {
		...coreInit,
		method:			'POST',
		body:			JSON.stringify({'email': email, 'password': password})
	};

	debug('login, init is: ' + JSON.stringify(init));
	return fetchOk('/login', init)
		.then((response) => {debug('login, fetch ok.');return response;})
		.catch((error) => {debug('login, fetch, caught err.'); throw error;});

};

export const forgot = (email) => {
	debug('forgot, called.');

	let init = {
		...coreInit,
		method:			'POST',
		body:			JSON.stringify({'email': email})
	};

	debug('forgot, init is: ' + JSON.stringify(init));
	return fetchOk('/forgot', init)
		.then((response) => {debug('forgot, fetch ok.');return response;})
		.catch((error) => {debug('forgot, fetch, caught err.'); throw error;});

};

export const reset = (id, password) => {
	debug('reset, called.');

	let init = {
		...coreInit,
		method:			'POST',
		body:			JSON.stringify({'password': password})
	};

	debug('reset, init is: ' + JSON.stringify(init));
	return fetchOk('/reset/' + id, init)
		.then((response) => {debug('reset, fetch ok.');return response;})
		.catch((error) => {debug('reset, fetch, caught err.'); throw error;});

};

export const authenticate = (email, password) => {
	debug('authenticate, called.');

	let init = {
		...coreInit,
		method:			'GET',
		body:			JSON.stringify({'email': email, 'password': password})
	};

	debug('authenticate, init is: ' + JSON.stringify(init));
	return fetchOk('/authenticate', init)
		.then((response) => {debug('validate, fetch ok.');return response;})
		.catch((error) => {debug('validate, fetch, caught err.'); throw error;});

};


export const logout = () => {
	debug('logout, called.');

	let init = {
		...coreInit,
		method:			'GET'
	};

	return fetchOk('/logout', init)
		.then((response) => {debug('logout, fetch ok.');return response;})
		.catch((error) => {debug('logout, fetch, caught err.'); throw error;});
};

export const updateProfile = (id, firstName, lastName, email, org_id, role) => {
	debug('updateProfile, called.');

	let init = {
		...coreInit,
		method:			'PUT',
		body:			JSON.stringify({'id': id, 'firstName': firstName,
			'lastName': lastName, 'email': email, 'org_id': org_id, 'role': role})
	};

	debug('updateProfile, init is: ' + JSON.stringify(init));
	return fetchOk('/user/' + id, init)
		.then((response) => {debug('signup, response ok.');return response;})
		.catch((error) => {debug('signup, fetch, caught err.'); throw error;});
};

export const changePassword = (id, password) => {
	debug('changePassword, called with password: ' + password);

	let init = {
		...coreInit,
		method:			'PUT',
		body:			JSON.stringify({'password': password})
	};

	debug('changePassword, init: ' + JSON.stringify(init));
	return fetchOk('/change/' + id, init)
		.then((response) => {debug('changePassword, fetch ok.');return response;})
		.catch((error) => {debug('changePassword, fetch, caught err.'); throw error;});
};

export const invite = (email, org_id) => {
	debug('invite, called.');

	let init = {
		...coreInit,
		method:			'POST',
		body:			JSON.stringify({'email': email, 'org_id': org_id})
	};

	return fetchOk('/invite/', init)
		.then((response) => {debug('invite, fetch ok.');return response;})
		.catch((error) => {debug('invite, fetch, caught err.'); throw error;});
};

export const closeAccount = (id) => {
	debug('closeAccount, called.');

	let init = {
		...coreInit,
		method:			'DELETE'
	};

	return fetchOk('/user/' + id, init)
		.then((response) => {debug('closeAccount, fetch ok.');return response;})
		.catch((error) => {debug('closeAccount, fetch, caught err.'); throw error;});
};
