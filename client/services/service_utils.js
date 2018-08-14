import fetch from 'cross-fetch';
import Debug from 'debug';

let debug = Debug('service_utils');

export const coreInit = {
	credentials:	'same-origin',
	headers:		{'content-type': 'application/json'}
};

export const fetchOk = (api, init) => fetch(api, init)
 	.then(res => {
		debug('fetchOk response ok is: ' + res.ok);
		return res.ok ? res : res.json().then(err => Promise.reject(err));
	});
