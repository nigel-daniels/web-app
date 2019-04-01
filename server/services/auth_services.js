/**
 * Copyright (c) 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import * as nodemailer from 'nodemailer';
import stringify from 'json-stringify-safe';
import mailConfig from '../config/mail';
import Organisation from '../models/Organisation';
import User, {ADMIN, SUPER} from '../models/User';
import debugModule from 'debug';

const debug = debugModule('auth_service');

/* ***************************************
 *  POST, Sign up a new user
 * ***************************************/
export function signup(req, res) {
	debug('signup, called.');
	// Check we have required fields
	debug('signup, req body: ' + JSON.stringify(req.body));
	if (!req.body.email) {
		res.status(400).send({message: 'The email is required.'});
		return;
	}

	if (!req.body.password) {
		res.status(400).send({message: 'The password is required.'});
		return;
	}

	if (!req.body.organisation) {
		res.status(400).send({message: 'An organisation is required.'});
		return;
	}
	debug('Organisation is: ' + req.body.organisation);
	// Check the organisation does not already exists
	Organisation.findOne({name: req.body.organisation}, (err, org) => {
		if (err) {
			debug('signup, err finding organisation: ' + JSON.stringify(err));
			res.status(500).send({message: 'Error finding organisation,', cause: + err.message});
			return;
		}

		if (org) {
			debug('signup, organisation exists.');
			res.status(400).send({message: 'The organisation you want to create already exists, contact the administrator to join.'});  // NLS
			return;
		} else {
			// Check the user email is not already in use
			User.findOne({email: req.body.email}, (err, user) => {
				if (err) {
					debug('signup, err finding user: ' + JSON.stringify(err));
					res.status(500).send({message: 'Error finding user, message: ', cause: err.message});
					return;
				}

				if (user) {
					debug('signup, email already exists.');
					res.status(400).send({message: 'The email ' + req.body.email + ' is in use.'});
					return;
				} else {
					debug('signup, user data is validated.');

					// Ok now we can start creating the user and the org
					debug('signup, create organisation.');
					Organisation.create({name: req.body.organisation}, (err, org) => {
						if (err) {
							debug('signup, err creating organisation: ' + JSON.stringify(err));
							res.status(500).send({message: 'Error creating organisation', cause: err.message});
							return;
						}

						debug('Created org: ' + JSON.stringify(org));

						User.countDocuments({}, (err, count) => {
							if (err) {
								debug('signup, err checking user count: ' + JSON.stringify(err));
								res.status(500).send({message: 'Error checking user count.', cause: err.message});
								return;
							}

							let role = count === 0 ? SUPER : ADMIN;

							debug('signup, creating user');
							let userDoc = {
								firstName: 		req.body.firstName,
								lastName: 		req.body.lastName,
								email:			req.body.email,
								password:		req.body.password,
								role:			role,
								org_id: 		org.id
							};
							debug('signup, ' + JSON.stringify(userDoc));

							User.create(userDoc, (err, user) => {
								if (err) {
									debug('signup, err creating user: ' + JSON.stringify(err));
									res.status(500).send({message: 'Error creating user', cause: err.message});
									return;
								}

								debug('signup, success.');
								res.status(201).send({result: user});
								return;
							});
						});
					});
				}
			});
		}
	});
}

export function login(req, res) {
	debug('login, called.');
	//res.locals.user = req.user;
	res.status(200).send({result: req.user});
	debug('sent res: ' + stringify(res, null, 4));
	return;
}

export function authenticate(req, res) {
	debug('authenticate, called.');
	if (req.isAuthenticated()) {
		debug('authenticate, ok.');
		res.sendStatus(200);
	} else {
		debug('authenticate, not ok.');
		res.status(401).send({message: 'Authentication failure.'});
	}
}

export function forgotPassword(req, res) {
	debug('forgotPassword, called.');
	var resetPasswordUrl = 'https://' + req.headers.host + '/reset';

	debug('forgotPassword, finding user.');
	User.User.findOne({username: req.body.username}, function(err, user) {
		if (err) {
			debug('forgotPassword, finding user err: ' + err.message);
			res.status(500).send({message: 'Error finding user.', cause: err.message});
			return;
		}

		if (user) {
			debug('forgotPassword, found user.');
			resetPasswordUrl += '/?id=' + user._id;

			debug('forgotPassword, creating smtpTransport.');
			var smtpTransport = nodemailer.createTransport(mailConfig);

			var mailOpts =  {
				from:		'no.reply@initiatethinking.com',
				to:			user.email,
				subject:	'Initiate Thinking Demo App - Password Request',
				text:		'Please use this link to reset your password: ' + resetPasswordUrl
			};

			debug('forgotPassword, sending email.');
			smtpTransport.sendMail(mailOpts, function(err) {
				if (err) {
					res.status(500).send({message: 'Error sending e-mail', cause: err.message}); // NLS
					return;
				}

				debug('forgotPassword, email sent ok.');
				res.sendStatus(200);
				return;
			});
		} else {
			debug('forgotPassword, user ' + req.body.username + ' not found');
			res.status(404).send({message: 'That user could not be found.'});
			return;
		}
	});
}

export function getResetPage(req, res) {
	debug('getResetPage, called');
	debug('getResetPage, id: ' + req.query.id);
	res.redirect('/reset/' + req.query.id);
	return;
}

export function resetPassword(req, res) {
	debug('resetPassword, called.');
	User.User.findById(req.body.id, function(err, user) {
		if (err) {
			res.status(500).send({message: 'Error finding user', cause: err.message});
			return;
		} else {
			if (user) {
				if (req.body.password) {
					User.updatePassword(user._id, req.body.password, function(err) {
						if (err) {
							res.status(500).send({message: 'Error updating password', cause: err.message});
							return;
						}

						res.sendStatus(200);
						return;
					});
				} else {
					res.status(400).send({message: 'No password provided.'});
					return;
				}
			} else {
				res.status(404).send({message: 'The user requested was not found.'});
				return;
			}
		}
	});
}

export function logout(req, res) {
	debug('logout, called.');
	req.session.destroy();
	req.logout();
	debug('logout, done.');
	res.sendStatus(200);
	return;
}

export function isAuthenticated(req, res, next) {
	debug('isAuthenticated, called.');
	if (req.isAuthenticated()) {
		debug('isAuthenticated, ok.');
		return next();
	}

	debug('isAuthenticated, not ok.');
	res.redirect('/');
	return;
}
