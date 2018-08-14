/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import * as redux from 'redux';
import * as actions from '../actions';
import Debug from 'debug';

let debug = Debug('user_reducer');

export default function reducer(state = new Map(), action) {
	debug('reducer called');
	switch (action.type) {
	case actions.ADD_USER: {
		debug('case is ADD_USER');
		return addUser(state, action);
	}
	case actions.GET_USER:
	case actions.GET_USERS:
	case actions.UPDATE_USER:
	case actions.DELETE_USER:
			//console.log('reducer, SET_ENTRIES: state = ' + JSON.stringify(state));
			//return setEntries(state, action.entries);
	}

	return state;
}
