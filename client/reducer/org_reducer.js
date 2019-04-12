/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import { handle } from 'redux-pack';
import * as actions from '../actions';
import Debug from 'debug';

let debug = Debug('org_reducer');

const INITIAL_STATE = {
	isworking: false,
	org: null,
	members: null,
	selectedMember: {},
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

	case actions.GET_USER_ORG: {
		debug('GET_USER_ORG is called');
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, org: null, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, org: payload.org })
		});
	}
	case actions.GET_MEMBERS: {
		debug('GET_MEMBERS is called');
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, members: null, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, members: payload.members })
		});
	}
	case actions.GET_SELECTED_MEMBER: {
		debug('GET_SELECTED_MEMBER is called');
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, selectedMember: {}, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, selectedMember: payload.user })
		});
	}
	case actions.UPDATE_MEMBER: {
		debug('GET_SELECTED_MEMBER is called');
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, selectedMember: payload.user })
		});
	}
	case actions.CLOSE_MEMBER_ACCOUNT: {
		debug('GET_SELECTED_MEMBER is called');
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, selectedMember: payload.user })
		});
	}
	default:
		return state;
	}
}
