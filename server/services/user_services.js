/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {User, ADMIN, SUPER, STAFF} from '../models/User';
import debugModule from 'debug';

const debug = debugModule('user_service');

/* ***************************************
 *  GET The current user
 * ***************************************/
export function getUser(req, res) {
	debug('GET, called.');

	User.findById(req.user.id, function(err, user) {
		if (err) {
			debug('GET, err: ' + JSON.stringify(err));
			res.status(500).send('Error finding user: ' + err.message);
			return;
		}

		if (user) {
			debug('GET, success');
			res.status(200).send(user);
			return;
		} else {
			debug('GET, user not found.');
			res.status(404).send('The user requested was not found.');
			return;
		}
	});
}

/* ***************************************
 *  GET The users this user can see
 * ***************************************/
export function getUsers(req, res) {
	debug('GET:*, called.');

	// If its the super user we need a different query parameter
	let query = req.user.role === SUPER ? {} : {org_id: req.user.org_id, active: true};

	User.findMany(query, (err, users) => {
		if (err) {
			debug('GET:*, err: ' + JSON.stringify(err));
			res.status(500).send('Error finding users, message: ' + err.message);
			return;
		}

		if (users) {
			debug('GET:*, success');
			res.status(200).send(users);
			return;
		} else {
			debug('GET:*, no users found');
			res.status(404).send('No users found.');
			return;
		}
	});
}

/* ***************************************
 *  GET The users this user can see
 * ***************************************/
export function getUserById(req, res) {
	debug('GET:id, called.');

	let query = req.user.role === SUPER ? {_id: req.params.id} : {_id: req.params.id, role: req.user.role, active: true};

	User.findOne(query, function(err, user) {
		if (err) {
			debug('GET:id, err: ' + JSON.stringify(err));
			res.status(500).send('Error finding users, message: ' + err.message);
			return;
		}

		if (user) {
			debug('GET:id, success');
			res.status(200).send(user);
			return;
		} else {
			debug('GET:id, user not found.');
			res.status(404).send('The user requested was not found.');
			return;
		}
	});
}

/* ***************************************
 *  PUT Update a user
 * ***************************************/
export function putUser(req, res) {
	debug('PUT, called.');

	if ((req.user.role === SUPER) || ((req.user.role === ADMIN) && (req.user.org_id === req.params.user.org_id)) || (req.user._id === req.params.user._id)) {
		User.findById(req.params.user._id, (err, user) => {
			if (err) {
				debug('PUT, error finding user: ' + JSON.stringify(err));
				res.status(500).send('Error finding user, message: ' + err.message);
				return;
			}

			if (user) {
				// Validate required input values
				debug('PUT, checking user values provided.');
				if (!req.body.email) {
					debug('PUT, e-mail is required');
					res.status(400).send('An e-mail address is required.'); // NLS
					return;
				} else if (!req.body.role) {
					debug('PUT, role is required');
					res.status(400).send('A user role is required.'); // NLS
					return;
				}

				// Check the role is valid
				if (!User.validateRole(req.body.role)) {
					debug('PUT, not a valid user role.');
					res.status(400).send('The user role provided is invalid.'); // NLS
					return;
				}

				// Validate the email is not already in use
				if (req.body.email !== user.email) {
					debug('PUT, validating email is unique.');
					User.findOne({email: req.body.email}, (err, user) => {
						if (err) {
							debug('PUT, error finding user by email: ' + err.message);
							res.status(500).send('Error checking email, message: ' + err.message);
							return;
						}

						if (user) {
							debug('PUT, email is already in use.');
							res.status(400).send('The selected e-mail address is in use.'); // NLS
							return;
						}
					});
				}

				debug('PUT, User is name: ' + user.firstName + ' ' + user.lastName + ', email: ' + user.email + ', role: ' + user.role);
				// Ok Validation passed let's update the user
				debug('userHandler - putUser, updating user values.');
				user.firstName = req.body.firstName;
				user.lastName = req.body.lastName;
				user.email = req.body.email;
				user.org_id = req.body.org_id;
				user.role = req.body.role;

				debug('PUT, saving the user.');
				user.save((err) => {
					if (err) {
						debug('PUT, error saving user updates: ' + JSON.stringify(err));
						res.status(500).send('Error saving the user details, message: ' + err.message);
						return;
					}

					debug('PUT, success!');
					res.sendStatus(200);
					return;
				});
			} else {
				debug('PUT, requested user was not found.');
				res.status(404).send('The user requested was not found.');
				return;
			}
		});
	} else {
		debug('PUT, invalid update from user: ' + req.user.id + ', updating user: ' + req.params.id);
		res.status(403).send('user: ' + req.user.id + ' does not have permission to update user: ' + req.params.id);
		return;
	}
}

/* ***************************************
 *  DELETE a user
 * ***************************************/
export function deleteUser(req, res) {
	debug('DELETE, called.');

	User.findById(req.params.id, (err, user) => {
		if (err) {
			debug('DELETE, err: ' + JSON.stringify(err));
			res.status(500).send('Error finding user, message: ' + err.message);
			return;
		}

		if (user) {
			if ((req.user.role === STAFF && req.param.id === req.user.id) || (req.user.role === ADMIN && req.user.org_id === user.org_id) || (req.user.role === SUPER)) {
				user.active = false;

				user.save((err) => {
					if (err){
						debug('DELETE, err: ' + JSON.stringify(err));
						res.status(500).send('Error deleting user, message: ' + err.message);
						return;
					}

					debug('DELETE, err: ' + JSON.stringify(err));
					res.sendStatus(200);
					return;
				});
			} else {
				debug('DELETE, invalid delete from user: ' + req.user.id + ', deleting user: ' + req.params.id);
				res.status(403).send('user: ' + req.user.id + ' does not have permission to delete user: ' + req.params.id);
				return;
			}
		} else {
			debug('DELETE, The user requested was not found.');
			res.status(404).send('The user requested was not found.');
			return;
		}
	});
}
