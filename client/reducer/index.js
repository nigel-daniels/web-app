/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import { Action, combineReducers } from 'redux';
import auth_reducer from './auth_reducer';
import user_reducer from './user_reducer';
import org_reducer from './org_reducer';

const reducer = combineReducers({
	auth: auth_reducer,
	user: user_reducer,
	org: org_reducer
});

export default reducer;
