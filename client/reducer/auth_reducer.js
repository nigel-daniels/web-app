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
	profile: null,
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
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, loggedin: true, profile: payload.user })
		});
	}
    case actions.FORGOT: {
		debug('FORGOT is called');
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, loggedin: false, err: payload.message }),
			success: prevState => ({ ...prevState })
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
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, loggedin: false, profile: null })
		});
	}
	case actions.UPDATE_PROFILE: {
		debug('UPDATE_PROFILE is called');
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, profile: payload.user })
		});
	}
	case actions.CHANGE_PASSWORD: {
		debug('CHANGE_PASSWORD is called');
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, profile: payload.user })
		});
	}
	case actions.CLOSE_ACCOUNT: {
		debug('CLOSE_ACCOUNT is called');
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, loggedin: false, profile: null })
		});
	}
	default:
		return state;
	}
}
