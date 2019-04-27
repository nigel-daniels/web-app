/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import fetch from 'cross-fetch';
import { coreInit, fetchOk } from './service_utils';
import Debug from 'debug';

let debug = Debug('org_services');

export const getUserOrg = () => {
	debug('getUserOrg, called.');

	let init = {
		...coreInit,
		method:			'GET'
	};

	debug('getUserOrg, init is: ' + JSON.stringify(init));
	return fetchOk('/org', init)
		.then((response) => {debug('getUserOrg, response ok.');return response;})
		.catch((error) => {debug('getUserOrg, fetch, caught err.'); throw error;});

};

export const getMembers = (org_id) => {
	debug('getMembers, called.');

	let init = {
		...coreInit,
		method:			'GET'
	};

	debug('getMembers, init is: ' + JSON.stringify(init));
	return fetchOk('/org/' + org_id + '/members', init)
		.then((response) => {debug('getMembers, response ok.');return response;})
		.catch((error) => {debug('getMembers, fetch, caught err.'); throw error;});

};

export const getAllMembers = () => {
	debug('getMembers, called.');

	let init = {
		...coreInit,
		method:			'GET'
	};

	debug('getMembers, init is: ' + JSON.stringify(init));
	return fetchOk('/members', init)
		.then((response) => {debug('getMembers, response ok.');return response;})
		.catch((error) => {debug('getMembers, fetch, caught err.'); throw error;});

};

export const getSelectedMember = (id) => {
	debug('getSelectedMember, called.');

	let init = {
		...coreInit,
		method:			'GET'
	};

	debug('getSelectedMember, init is: ' + JSON.stringify(init));
	return fetchOk('/user/' + id, init)
		.then((response) => {debug('getSelectedMember, response ok.');return response;})
		.catch((error) => {debug('getSelectedMember, fetch, caught err.'); throw error;});

};

export const updateMember = (id, firstName, lastName, email, org_id, role) => {
	debug('updateMember, called.');

	let init = {
		...coreInit,
		method:			'PUT',
		body:			JSON.stringify({'id': id, 'firstName': firstName,
			'lastName': lastName, 'email': email, 'org_id': org_id, 'role': role})
	};

	debug('updateMember, init is: ' + JSON.stringify(init));
	return fetchOk('/user/' + id, init)
		.then((response) => {debug('updateMember, response ok.');return response;})
		.catch((error) => {debug('updateMember, fetch, caught err.'); throw error;});

};

export const closeMemberAccount = (id) => {
	debug('closeMemberAccount, called.');

	let init = {
		...coreInit,
		method:			'DELETE'
	};

	debug('closeMemberAccount, init is: ' + JSON.stringify(init));
	return fetchOk('/user/' + id, init)
		.then((response) => {debug('closeMemberAccount, response ok.');return response;})
		.catch((error) => {debug('closeMemberAccount, fetch, caught err.'); throw error;});

};

export const getOrgs = () => {
	debug('getOrgs, called.');

	let init = {
		...coreInit,
		method:			'GET'
	};

	debug('getOrgs, init is: ' + JSON.stringify(init));
	return fetchOk('/orgs', init)
		.then((response) => {debug('getOrgs, response ok.');return response;})
		.catch((error) => {debug('getOrgs, fetch, caught err.'); throw error;});

};

export const getSelectedOrg = (id) => {
	debug('getSelectedOrg, called.');

	let init = {
		...coreInit,
		method:			'GET'
	};

	debug('getSelectedOrg, init is: ' + JSON.stringify(init));
	return fetchOk('/org/' + id, init)
		.then((response) => {debug('getSelectedOrg, response ok.');return response;})
		.catch((error) => {debug('getSelectedOrg, fetch, caught err.'); throw error;});

};

export const updateOrg = (id, name) => {
	debug('updateOrg, called.');

	let init = {
		...coreInit,
		method:			'PUT',
		body:			JSON.stringify({'id': id, 'name': name})
	};

	debug('updateOrg, init is: ' + JSON.stringify(init));
	return fetchOk('/org/' + id, init)
		.then((response) => {debug('updateOrg, response ok.');return response;})
		.catch((error) => {debug('updateOrg, fetch, caught err.'); throw error;});

};
