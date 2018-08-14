import {expect} from 'chai';
import {List, fromJS} from 'immutable';

import * as service from '../services/user_services';

describe('user service logic', () => {

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

	describe('addUser', () => {


    	it('adds a user to the state', () => {

			const state = List();

			const nextState = service.addUser(state, user);

			expect(nextState).to.have.deep.property('[0]')
				.that.includes(user_result);

    	});

	});

});
