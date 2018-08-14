/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import { handle } from 'redux-pack';
import * as actions from '../actions';
import Debug from 'debug';

let debug = Debug('auth_reducer');

const INITIAL_STATE = {
	loggedin: false,
	isworking: false,
	user: null,
	err: null
};

export default function reducer(state = INITIAL_STATE, action) {
	debug('reducer is called');
	const { type, payload } = action;

	debug('start state is: ' + JSON.stringify(state));
	debug('action : ' + JSON.stringify(action));
	debug('type is: ' + type);
	debug('payload : ' + JSON.stringify(payload));

	switch (action.type) {

	case actions.SIGNUP: {
		debug('SIGNUP is called');
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState })
		});
	}

	case actions.LOGIN: {
		debug('LOGIN is called');
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, loggedin: false, err: payload.message }),
			success: prevState => ({ ...prevState, loggedin: true })
		});
	}
	case actions.AUTHENTICATE: {
		debug('AUTHENTICATE is called');
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, loggedin: false, err: payload.message }),
			success: prevState => ({ ...prevState, loggedin: true })
		});
	}
	case actions.LOGOUT: {
		debug('LOGOUT is called');
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, loggedin: false, err: payload.message }),
			success: prevState => ({ ...prevState, loggedin: false })
		});
	}
	default:
		return state;
	}
}
