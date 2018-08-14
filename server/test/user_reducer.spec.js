import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../reducers';
import * as actions from '../actions';

describe('user reducer', function() {

	let user = {
		firstName: 	'John',
		lastName: 	'Smith',
		email: 		'john.smith@example.com',
		password: 	'password',
		org_id:		'001'
	};

	let user_result = {
		firstName: 	'John',
		lastName: 	'Smith',
		email: 		'john.smith@example.com',
		org_id:		'001'
	};

	it('has an initial state', function() {
    	const action = {type: actions.ADD_USER, user: user};
    	const nextState = reducer(undefined, action);

		expect(nextState).to.have.deep.property('users')
			.with.deep.property('[0]')
			.that.includes(user_result);
  		});

	it('handles ADD_USER', function() {
    	const initialState = Map();
    	const action = {type: actions.ADD_USER, user: user};

    	const nextState = reducer(initialState, action);

    	expect(nextState).to.have.deep.property('users')
			.with.deep.property('[0]')
			.that.includes(user_result);

	});
});
