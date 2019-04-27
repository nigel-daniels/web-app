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
	selectedMember: null,
	orgs: null,
	selectedOrg: null,
	err: null
};

export default function reducer(state = INITIAL_STATE, action) {
	debug('reducer is called');
	const { type, payload } = action;

	debug('action : ' + JSON.stringify(action));

	switch (action.type) {

	case actions.GET_USER_ORG: {
		debug('GET_USER_ORG is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, org: null, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, org: payload.org })
		});
	}
	case actions.GET_MEMBERS: {
		debug('GET_MEMBERS is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, members: null, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, members: payload.members })
		});
	}
	case actions.GET_ALL_MEMBERS: {
		debug('GET_ALL_MEMBERS is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, members: null, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, members: payload.members })
		});
	}
	case actions.GET_SELECTED_MEMBER: {
		debug('GET_SELECTED_MEMBER is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, selectedMember: null, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, selectedMember: payload.user })
		});
	}
	case actions.UPDATE_MEMBER: {
		debug('UPDATE_MEMBER is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, selectedMember: null, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, selectedMember: payload.user })
		});
	}
	case actions.CLOSE_MEMBER_ACCOUNT: {
		debug('CLOSE_MEMBER_ACCOUNT is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, selectedMember: payload.user })
		});
	}
	case actions.GET_ORGS: {
		debug('GET_ORGS is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, orgs: null, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, orgs: payload.orgs })
		});
	}
	case actions.GET_SELECTED_ORG: {
		debug('GET_SELECTED_ORG is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, selectedOrg: null, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, selectedOrg: payload.org })
		});
	}
	case actions.UPDATE_ORG: {
		debug('UPDATE_ORG is called');
		debug('payload : ' + JSON.stringify(payload));
		return handle(state, action, {
			start: prevState => ({...prevState, isworking: true, org: null, err: null}),
			finish: prevState => ({ ...prevState, isworking: false }),
			failure: prevState => ({ ...prevState, err: payload.message }),
			success: prevState => ({ ...prevState, org: payload.org })
		});
	}
	default:
		return state;
	}
}
