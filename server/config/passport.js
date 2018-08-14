/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import passport from 'passport';
import {Strategy as passportLocal} from 'passport-local';
import User from '../models/User';
import Debug from 'debug';

let debug = Debug('passport');

var localOptions = {
	usernameField: 'email'
};

/* ***************************************
 *  Passport login sessions
 *************************************** */

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
	debug('serializeUser, called.');
	done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
	debug('deserializeUser, called.');
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

/* ***************************************
 *  LOCAL LOGIN Strategy
 *************************************** */
passport.use('local', new passportLocal(localOptions,
	function(email, password, done) {
		debug('local, called.');
		User.findOne({email: email}, (err, user) => {
			if (err) {return done(err);}

			if (user) {
				debug('local, user found');
				if (user.active) {
					if (user.validatePassword(password)) {
						debug('password ok, logged in.');
						return done(null, user);
					} else {
						debug('local, password provided was incorrect.');
						let error = {status: 401, message: 'The credentials provided were not correct.'};
						return done(error, false); // NLS
					}
				} else {
					debug('local, user account is deactivated.');
					let error = {status: 401, message: 'The credentials provided were not correct.'};
					return done(error, false);
				}

			} else {
				debug('User for the email ' + email + ' was not found.');
				let error = {status: 401, message: 'The credentials provided were not correct.'};
				return done(error, false); // NLS
			}
		});
	}
));
