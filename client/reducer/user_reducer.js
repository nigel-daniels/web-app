/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import * as redux from 'redux';
import * as actions from '../actions';
import Debug from 'debug';

let debug = Debug('user_reducer');

const INITIAL_STATE = {
	isworking: false,
	user: null,
	err: null
};

export default function reducer(state = new Map(), action) {
	debug('reducer called');
	const { type, payload } = action;

	debug('action : ' + JSON.stringify(action));

	switch (action.type) {
	case actions.ADD_USER: {
		debug('case is ADD_USER');
		debug('payload : ' + JSON.stringify(payload));
		return addUser(state, action);
	}
	case actions.GET_USER:
	case actions.GET_USERS:
	case actions.UPDATE_USER: {
		debug('case is UPDATE_USER');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, loggedin: true, profile: payload.user })
		});
	}

	case actions.DELETE_USER:
			//console.log('reducer, SET_ENTRIES: state = ' + JSON.stringify(state));
			//return setEntries(state, action.entries);
	}

	return state;
}
