/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import fetch from 'cross-fetch';
import { coreInit, fetchOk } from './service_utils';
import Debug from 'debug';

let debug = Debug('user_servcies');

export function addUser(firstname, lastname, organisation, email, password, role) {


};
export function updateUser(id, firstname, lastname, email, org_id, role) {
	debug('updateUser, called.');

	let init = {
		...coreInit,
		method:			'PUT',
		body:			JSON.stringify({'user': {'id': id, 'firstName': firstName, 'lastName': lastName,
			'email': email, 'org_id': org_id, 'password': password}})
	};

	debug('updateUser, init is: ' + JSON.stringify(init));
	return fetchOk('/user', init)
		.then((response) => {debug('signup, response ok.');return response;})
		.catch((error) => {debug('signup, fetch, caught err.'); throw error;});
};
