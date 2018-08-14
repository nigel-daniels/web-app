import {expect} from 'chai';
import {List, Map} from 'immutable';
import makeStore from '../store';
import * as actions from '../actions';

describe('store', function() {

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

	const storeObjects = makeStore();
	const store = storeObjects.store;


	it('is a Redux store configured with the correct reducer', function() {
		expect(store.getState()).to.include({users: List()});
	});


	it('can accept a basic dispatch', function() {
		const action = {type: actions.ADD_USER, user: user};

		store.dispatch(action);

		expect(store.getState()).to.have.deep.property('users')
			.with.deep.property('[0]')
			.that.includes(user_result);

	});

});
