import fetch from 'cross-fetch';
import Debug from 'debug';

let debug = Debug('service_utils');

export const coreInit = {
	credentials:	'same-origin',
	headers:		{'content-type': 'application/json'}
};

export const fetchOk = (api, init) => fetch(api, init)
 	.then(res => {
		debug('fetchOk response (pre-json): ' + JSON.stringify(res));
		return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
	});
