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

	debug('action : ' + JSON.stringify(action));

	switch (action.type) {

	case actions.SIGNUP: {
		debug('SIGNUP is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState })
		});
	}

	case actions.LOGIN: {
		debug('LOGIN is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, loggedin: true, profile: payload.user })
		});
	}
	case actions.FORGOT: {
		debug('FORGOT is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState })
		});
	}
	case actions.RESET: {
		debug('RESET is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState })
		});
	}
	case actions.AUTHENTICATE: {
		debug('AUTHENTICATE is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, loggedin: false, err: payload.message }),
			success: prevState => ({ ...prevState, loggedin: true })
		});
	}
	case actions.LOGOUT: {
		debug('LOGOUT is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, loggedin: false, profile: null })
		});
	}
	case actions.UPDATE_PROFILE: {
		debug('UPDATE_PROFILE is called');
		debug('payload : ' + JSON.stringify(payload));
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
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, profile: payload.user })
		});
	}
	default:
		return state;
	}
}
