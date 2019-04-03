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

export const updateProfile = (newProfile) => {
	debug('updateProfile, called.');

	let init = {
		...coreInit,
		method:			'PUT',
		body:			JSON.stringify(newProfile)
	};

	return fetchOk('/user', init)
		.then((response) => {debug('updateProfile, fetch ok.');return response;})
		.catch((error) => {debug('updateProfile, fetch, caught err.'); throw error;});
};

export const changePassword = (newProfile) => {
	debug('changePassword, called.');

	let init = {
		...coreInit,
		method:			'PUT',
		body:			JSON.stringify(newProfile)
	};

	return fetchOk('/user', init)
		.then((response) => {debug('changePassword, fetch ok.');return response;})
		.catch((error) => {debug('changePassword, fetch, caught err.'); throw error;});
};

export const closeAccount = (id) => {
	debug('closeAccount, called.');

	let init = {
		...coreInit,
		method:			'DELETE',
		body:			JSON.stringify({'id': id})
	};

	return fetchOk('/user', init)
		.then((response) => {debug('closeAccount, fetch ok.');return response;})
		.catch((error) => {debug('closeAccount, fetch, caught err.'); throw error;});
};
