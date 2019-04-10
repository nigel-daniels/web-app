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
