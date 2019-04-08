/**
 * Copyright (c) 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import * as nodemailer from 'nodemailer';
import stringify from 'json-stringify-safe';
import mailConfig from '../config/mail.json';
import Organisation from '../models/Organisation';
import User, {ADMIN, SUPER} from '../models/User';
import Debug from 'debug';
import passport from 'passport';

const debug = Debug('auth_service');

/* ***************************************
 *  GET, Start the app
 * ***************************************/
export function start(req, res) {
	debug('start, called.');

	let env = Debug.enabled ? 'development' : 'production';
	return res.render('index', {'env': env});
}


/* ***************************************
 *  POST, Sign up a new user
 * ***************************************/
export function signup(req, res) {
	debug('signup, called.');
	// Check we have required fields
	debug('signup, req body: ' + JSON.stringify(req.body));
	if (!req.body.email) {
		return res.status(400).send({message: 'The email is required.'});
	}

	if (!req.body.password) {
		return res.status(400).send({message: 'The password is required.'});
	}

	if (!req.body.organisation) {
		return res.status(400).send({message: 'An organisation is required.'});
	}
	debug('Organisation is: ' + req.body.organisation);
	// Check the organisation does not already exists
	Organisation.findOne({name: req.body.organisation}, (err, org) => {
		if (err) {
			debug('signup, err finding organisation: ' + JSON.stringify(err));
			return res.status(500).send({message: 'Error finding organisation,', cause: + err.message});
		}

		if (org) {
			debug('signup, organisation exists.');
			return res.status(400).send({message: 'The organisation you want to create already exists, contact the administrator to join.'});  // NLS
		} else {
			// Check the user email is not already in use
			User.findOne({email: req.body.email}, (err, user) => {
				if (err) {
					debug('signup, err finding user: ' + JSON.stringify(err));
					return res.status(500).send({message: 'Error finding user, message: ', cause: err.message});
				}

				if (user) {
					debug('signup, email already exists.');
					return res.status(400).send({message: 'The email ' + req.body.email + ' is in use.'});
				} else {
					debug('signup, user data is validated.');

					// Ok now we can start creating the user and the org
					debug('signup, create organisation.');
					Organisation.create({name: req.body.organisation}, (err, org) => {
						if (err) {
							debug('signup, err creating organisation: ' + JSON.stringify(err));
							return res.status(500).send({message: 'Error creating organisation', cause: err.message});
						}

						debug('Created org: ' + JSON.stringify(org));

						User.countDocuments({}, (err, count) => {
							if (err) {
								debug('signup, err checking user count: ' + JSON.stringify(err));
								return res.status(500).send({message: 'Error checking user count.', cause: err.message});
							}

							let role = count === 0 ? SUPER : ADMIN;

							debug('signup, creating user');
							let new_user = {
								firstName: 		req.body.firstName,
								lastName: 		req.body.lastName,
								email:			req.body.email,
								password:		req.body.password,
								role:			role,
								org_id: 		org.id
							};
							debug('signup, ' + JSON.stringify(new_user));

							User.create(new_user, (err, user) => {
								if (err) {
									debug('signup, err creating user: ' + JSON.stringify(err));
									return res.status(500).send({message: 'Error creating user', cause: err.message});
								}

								debug('signup, success.');
								return res.status(200).send({message: 'Success!'});
							});
						});
					});
				}
			});
		}
	});
}

/* ***************************************
 *  POST, Login to the system
 * ***************************************/
export function login(req, res, next) {
	debug('login, called.');

	passport.authenticate('local', function(err, user, info) {
    	if (err) {
			debug('login, err: ' + JSON.stringify(err));
      		return res.status(err.status).send({ message : err.message }); // will generate a 500 error
    	}

    	if (!user) {
			debug('login, no user: ' + JSON.stringify(err));
      		return res.status(err.status).send({ message : err.message });
    	}

		// It's our responsibility to loginto the session
    	req.login(user, loginErr => {
      		if (loginErr) {
        		return next(loginErr);
      		}

	  	return res.status(200).send({user: user});
    	});
	})(req, res, next);
}

/* ***************************************
 *  GET, routes back to the top level
 * ***************************************/
export function loginRedirect(req, res) {
	debug('loginRedirect, called.');
	return res.redirect('/');
}

/* ***************************************
 *  GET, validates login state
 * ***************************************/
export function authenticate(req, res) {
	debug('authenticate, called.');
	if (req.isAuthenticated()) {
		debug('authenticate, ok.');
		res.status(200).send({message: 'Success!'});;
	} else {
		debug('authenticate, not ok.');
		res.status(401).send({message: 'Authentication failure.'});
	}
}

/* ***************************************
 *  POST, send mail to reset password
 * ***************************************/
export function forgot(req, res) {
	debug('forgotPassword, called.');
	var resetPasswordUrl = 'https://' + req.headers.host + '/reset';

	debug('forgotPassword, finding user.');
	User.findOne({email: req.body.email}, function(err, user) {
		if (err) {
			debug('forgotPassword, finding user err: ' + err.message);
			return res.status(500).send({message: 'Error finding user.', cause: err.message});
		}

		if (user) {
			debug('forgotPassword, found user.');
			resetPasswordUrl += '/' + user._id;

			debug('forgotPassword, creating smtpTransport.');
			var smtpTransport = nodemailer.createTransport(mailConfig);

			var mailOpts =  {
				from:		'no.reply@initiatethinking.com',
				to:			user.email,
				subject:	'Web Demo App - Password Request',
				text:		'Please use this link to reset your password: ' + resetPasswordUrl
			};

			debug('forgotPassword, sending email.');
			smtpTransport.sendMail(mailOpts, function(err) {
				if (err) {
					return res.status(500).send({message: 'Error sending e-mail', cause: err.message}); // NLS
				}

				debug('forgotPassword, email sent ok.');
				return res.status(200).send({message: 'Success!'});
			});
		} else {
			debug('forgotPassword, user ' + req.body.username + ' not found');
			return res.status(404).send({message: 'That user could not be found.'});
		}
	});
}

/* ***************************************
 *  GET, serve up the reset page
 * ***************************************/
export function reset(req, res) {
	debug('reset, called');
	debug('reset, id: ' + req.params.id);

	let env = Debug.enabled ? 'development' : 'production';
	return res.render('reset', {'env': env, 'id': req.params.id});
}

/* ***************************************
 *  POST, new password
 * ***************************************/
export function resetPassword(req, res) {
	debug('resetPassword, called.');
	debug('resetPassword, body: ' + JSON.stringify(req.body));
	if (req.body.password) {
		User.findByIdAndUpdate(req.params.id, {'password': req.body.password}, null, (err, user) => {
			if (err) {
				return res.status(500).send({message: 'Error updating user', cause: err.message});
			} else {
				if (user) {
					return res.render('index', {'env': env});;
				} else {
					return res.status(404).send({message: 'The user requested was not found.'});
				}
			}
		});
	} else {
		return res.status(400).send({message: 'No password provided.'});
	}
}

/* ***************************************
 *  PUT, password
 * ***************************************/
export function changePassword(req, res) {
	debug('resetPassword, called.');
	debug('resetPassword, body: ' + JSON.stringify(req.body));
	if (req.body.password) {
		User.findByIdAndUpdate(req.params.id, {'password': req.body.password}, null, (err, user) => {
			if (err) {
				return res.status(500).send({message: 'Error updating user', cause: err.message});
			} else {
				if (user) {
					return res.status(200).send({'user': user});
				} else {
					return res.status(404).send({message: 'The user requested was not found.'});
				}
			}
		});
	} else {
		return res.status(400).send({message: 'No password provided.'});
	}
}
/* ***************************************
 *  GET, logout and end session
 * ***************************************/
export function logout(req, res) {
	debug('logout, called.');
	req.session.destroy();
	req.logout();
	debug('logout, done.');
	return res.status(200).send({message: 'Success!'});
}

/* ***************************************
 *  Internal method
 * ***************************************/
export function isAuthenticated(req, res, next) {
	debug('isAuthenticated, called.');
	if (req.isAuthenticated()) {
		debug('isAuthenticated, ok.');
		return next();
	}

	debug('isAuthenticated, not ok.');
	return res.redirect('/');
}
