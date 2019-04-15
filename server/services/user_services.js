/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import User, {ADMIN, SUPER, STAFF} from '../models/User';
import Debug from 'debug';

const debug = Debug('user_service');

/* ***************************************
 *  GET The current user
 * ***************************************/
export function getUser(req, res) {
	debug('GET, called.');

	User.findById(req.user.id, function(err, user) {
		if (err) {
			debug('GET, err: ' + JSON.stringify(err));
			return res.status(500).send({message: 'Error finding user: ' + err.message});
		}

		if (user) {
			debug('GET, success');
			return res.status(200).send({user: user});
		} else {
			debug('GET, user not found.');
			return res.status(404).send({message: 'The user requested was not found.'});
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
			return res.status(500).send({message: 'Error finding users: ' + err.message});
		}

		if (users) {
			debug('GET:*, success');
			return res.status(200).send({users: users});
		} else {
			debug('GET:*, no users found');
			return res.status(404).send({message: 'No users found.'});
		}
	});
}

/* ***************************************
 *  GET The users this user can see
 * ***************************************/
export function getUserById(req, res) {
	debug('GET:id, called.');

	//let query = req.user.role === SUPER ? {_id: req.params.id} : {_id: req.params.id, active: true};

	User.findOne({_id: req.params.id}, function(err, user) {
		if (err) {
			debug('GET:id, err: ' + JSON.stringify(err));
			return res.status(500).send({message: 'Error finding users: ' + err.message});
		}

		if (user) {
			if ((req.user.role === SUPER) || user.org_id.equals(req.user.org_id)) {
				debug('GET:id, success');
				return res.status(200).send({user: user});
			} else {
				debug('GET:id, user not part of requesting users org.');
				return res.status(403).send({message: 'User does not have permission to see this organisations members'});
			}

		} else {
			debug('GET:id, user not found.');
			return res.status(404).send({message: 'The user requested was not found.'});
		}
	});
}

/* ***************************************
 *  PUT Update a user
 * ***************************************/
export function putUser(req, res) {
	debug('PUT, called.');
	debug('PUT, req.user ' + JSON.stringify(req.user));
	debug('PUT, req.body ' + JSON.stringify(req.body));
	if ((req.user.role === SUPER) || ((req.user.role === ADMIN) && (req.user.org_id.equals(req.body.org_id))) || (req.user._id.equals(req.body.id))) {
		User.findById(req.params.id, (err, user) => {
			if (err) {
				debug('PUT, error finding user: ' + JSON.stringify(err));
				return res.status(500).send({message: 'Error finding user: ' + err.message});
			}

			if (user) {
				debug('PUT, got user: ' + JSON.stringify(user));
				// Validate required input values
				debug('PUT, checking user values provided.');
				if (!req.body.email) {
					debug('PUT, e-mail is required');
					return res.status(400).send({message: 'An e-mail address is required.'}); // NLS
				} else if (!req.body.role) {
					debug('PUT, role is required');
					return res.status(400).send({message: 'A user role is required.'}); // NLS
				}

				// Check the role is valid
				debug('PUT, checking user role.');
				if (!user.validateRole(req.body.role)) {
					debug('PUT, not a valid user role.');
					return res.status(400).send({message: 'The user role provided is invalid.'}); // NLS
				}

				// Validate the email is not already in use
				debug('PUT, checking user email.');
				if (req.body.email !== user.email) {
					debug('PUT, validating email is unique.');
					User.findOne({email: req.body.email}, (err, user_email) => {
						if (err) {
							debug('PUT, error finding user by email: ' + err.message);
							return res.status(500).send({message: 'Error checking email, message: ' + err.message}); // NLS
						}

						if (user_email) {
							debug('PUT, email is already in use.');
							return res.status(400).send({message: 'The selected e-mail address is in use.'}); // NLS
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
								return res.status(500).send({message: 'Error saving the user details, message: ' + err.message}); // NLS
							}

							debug('PUT, success!');
							return res.status(200).send({user: user});
						});
					});
				} else {
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
							return res.status(500).send({message: 'Error saving the user details, message: ' + err.message}); // NLS
						}

						debug('PUT, success!');
						return res.status(200).send({user: user});
					});
				}
			} else {
				debug('PUT, requested user was not found.');
				return res.status(404).send({message: 'The user requested was not found.'}); //NLS
			}
		});
	} else {
		debug('PUT, invalid update from user: ' + req.user._id + ', updating user: ' + req.params.user.id);
		return res.status(403).send({message: 'User: ' + req.user._id + ' does not have permission to update user: ' + req.params.user.id}); // NLS
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
			return res.status(500).send({message: 'Error finding user: ' + err.message});
		}

		if (user) {
			if ((req.user.role === STAFF && req.param.id.equals(req.user.id)) || (req.user.role === ADMIN && req.user.org_id.equals(user.org_id)) || (req.user.role === SUPER)) {
				user.active = false;

				user.save((err) => {
					if (err){
						debug('DELETE, err: ' + JSON.stringify(err));
						return res.status(500).send({message: 'Error deleting user, message: ' + err.message});
					}

					debug('DELETE, err: ' + JSON.stringify(err));
					return res.status(200).send({user: user});
				});
			} else {
				debug('DELETE, invalid delete from user: ' + req.user.id + ', deleting user: ' + req.params.id);
				return res.status(403).send({message: 'user: ' + req.user.id + ' does not have permission to delete user: ' + req.params.id});
			}
		} else {
			debug('DELETE, The user requested was not found.');
			return res.status(404).send({message: 'The user requested was not found.'});
		}
	});
}
