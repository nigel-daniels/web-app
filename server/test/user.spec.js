import { expect } from 'chai';
import mongoose from 'mongoose';
import User from '../models/User';

let db_cfg = require('../config/db.json');
let dbURL = !process.env.MONGO_URL ? db_cfg.mongourl : process.env.MONGO_URL;
mongoose.connect(dbURL);

describe('User', () => {
	let user = new User({
		firstName: 	'John',
		lastName: 	'Smith',
		email: 		'john.smith@example.com',
		password: 	'password',
		org_id:		'001'
	});;

	it('creates a User', () => {
		user.save(function(err, doc) {
			expect(doc).to.include({
				firstName: 	'John',
				lastName: 	'Smith',
				email: 		'john.smith@example.com',
				org_id:		'001'
			});
		});
	});


  	it('handles validatePassword, correct password', () => {
    	let result = user.validatePassword('password');
    	expect(result).to.equal(true);
  	});


	it('handles validatePassword, incorrect password', () => {
    	let result = user.validatePassword('foo');
    	expect(result).to.equal(false);
  	});


	it('handles password update', () => {
		user.set('password', 'foobaa');
		user.save(function(err, doc) {
			expect(err).to.be.null;
		});
	});


	it('handles validatePassword, new password', () => {
    	let result = user.validatePassword('foobaa');
    	expect(result).to.equal(true);
  	});

	it('handles deleting the user', () => {
		User.remove({_id: user.get('_id')}, function(err) {
			expect(err).is.null;
		});
	});
});
