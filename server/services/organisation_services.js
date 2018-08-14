/**
 * Copyright (c) 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import Organisation from '../models/Organisation';
import {User, ADMIN, SUPER} from '../models/User';
import Debug from 'debug';

const debug = Debug('organisation_service');

/* ***************************************
 *  POST Organisation
 * ***************************************/
export function postOrganisation(req, res) {
	debug('POST, called');

	if (req.body.name && req.body.name) {

		Organisation.find({name: req.body.name}, (err, organisation) => {
			if (err) {
				debug('POST, err: ' + JSON.stringify(err));
				res.status(500).send('error finding organisation : ' + JSON.stringify(err));
				return;
			}

			if (organisation) {
				debug('POST, organisation exists with the name: ' + req.body.name);
				res.status(400).SendStream('An organisation with the name ' + req.body.name + ' already exists.');
				return;
			}

			Organisation.create({name: req.body.name, parent: req.body.parent}, (err, doc) => {
				if (err) {
					debug('POST, error ' + JSON.stringify(err));
					res.status(500).send(err);
					return;
				}

				debug('POST, success');
				res.status(201).send(doc);
				return;
			});
		});
	} else {
		debug('POST, name provided invalid name: ' + req.body.name);
		res.status(400).send('Invalid name for organisation name: ' + req.body.name);
	}
}

/* ***************************************
 *  GET The organisation the user is a member of
 * ***************************************/
export function getOrganisation(req, res) {
	debug('GET, called');

	Organisation.findById(req.user.organisation, (err, organisation) => {
		if (err) {
			debug('GET, err: ' + JSON.stringify(err));
			res.status(500).send('error finding organisation : ' + JSON.stringify(err));
			return;
		}

		if (organisation) {
			debug('GET, success');
			res.status(200).send(organisation);
		} else {
			debug('GET, org: ' + req.user.organisation + ' not found for user: ' + req.user.id);
			res.status(404).send('no organisation found for account ' + req.user.id);
		}

	});
}

/* ***************************************
 *  GET organisations
 * ***************************************/
export function getOrganisations(req, res) {
	debug('GET:*, called');

	if (req.user.role === SUPER) {
		Organisation.find({}, (err, organisations) => {
			if (err) {
				debug('GET:*, err: ' + JSON.stringify(err));
				res.status(500).send('error finding organisations : ' + JSON.stringify(err));
				return;
			}

			if (organisations) {
				debug('GET:*, success');
				res.send(organisations);
			} else {
				debug('GET:*, org: no organisations found.');
				res.status(404).send('no organisations found.');
			}
		});
	} else {
		debug('GET:*, invalid access from user: ' + req.user.id + ', requesting orgs: ' + req.params.id);
		res.status(403).send('organisations not valid for user: ' + req.user.id);
	}
}

/* ***************************************
 *  GET organisation by provided id
 * ***************************************/
export function getOrganisationById(req, res) {
	debug('GET:id, called');

	if ((String(req.user.org_id) === req.params.id) || (req.user.role === SUPER)) {
		Organisation.findById(req.params.id, (err, organisation) => {
			if (err) {
				debug('GET:id, err: ' + JSON.stringify(err));
				res.status(500).send('error finding organisation : ' + JSON.stringify(err));
				return;
			}

			if (organisation) {
				debug('GET:id, success');
				res.send(organisation);
			} else {
				debug('GET:id, org: ' + req.params.id + ' not found.');
				res.status(404).send('no organisation found with the provided id.');
			}
		});
	} else {
		debug('GET:id, invalid access from user: ' + req.user.id + ', requesting org: ' + req.params.id);
		res.status(403).send('organisation not valid for user: ' + req.user.id);
	}
}

/* ***************************************
 *  GET organisation (active) members
 * ***************************************/
export function getOrganisationMembers(req, res) {
	debug('GET:id/members, called');

	if ((req.user.org_id === req.params.id) || (req.user.role === SUPER)) {
		User.find({org_id: req.params.id, active: true}, (err, users) => {
			if (err) {
				debug('GET:id/members, err: ' + JSON.stringify(err));
				res.status(500).send('error finding organisation members: ' + JSON.stringify(err));
				return;
			}

			debug('GET:id/members, success');
			res.status(200).send(users);
			return;
		});
	} else {
		debug('GET:id/members, invalid request from user: ' + req.user.id);
		res.status(403).send('User does not have permission to see these organisation members');
	}
}

/* ***************************************
 *  PUT Organisation
 *************************************** */
export function putOrganisation(req, res) {
	debug('PUT, called');

	// Check the user belongs to this org
	if (req.params.id === req.user.org_id) {
		// Check we have a name
		if (req.body.name) {
			// Check it's not empty
			if (req.body.name !== '') {
				// If the provided name is valid check it's not already in use
				Organisation.find({name: req.body.name}, (err, organisation) => {
					if (err) {
						debug('PUT, err: ' + JSON.stringify(err));
						res.status(500).send('error finding organisation : ' + JSON.stringify(err));
						return;
					}

					// IF we got an organisation the name's in use opps
					if (organisation) {
						debug('PUT, organisation exists with the name: ' + req.body.name);
						res.status(400).SendStream('An organisation with the name ' + req.body.name + ' already exists.');
						return;
					} else {

						// Ok let's get the org to update
						Organisation.findById(req.params.id, (err, organisation) => {
							if (err) {
								debug('PUT, err: ' + JSON.stringify(err));
								res.status(500).send('error finding organisation : ' + JSON.stringify(err));
								return;
							}

							// Finally let's do the update
							if (organisation) {
								organisation.name = req.body.name;

								organisation.save((err) => {
									if (err) {
										debug('PUT, error saving organisation');
										res.status(500).send(err);
										return;
									}

									debug('PUT, success');
									res.sendStatus(200);
									return;
								});
							} else {
								debug('GET:*, org: no organisations found.');
								res.status(404).send('no organisations found.');
								return;
							}
						});
					}
				});
			} else {
				debug('PUT, name was empty');
				res.status(400).SendStream('The provided organisation name was empty.');
				return;
			}
		} else {
			debug('PUT, name was not provided');
			res.status(400).SendStream('The organisation name was not provided.');
			return;
		}
	} else {
		debug('PUT, invalid update from user: ' + req.user.id + ', updating org: ' + req.params.id);
		res.status(403).send('organisation not valid for user: ' + req.user.id);
	}
}

/* ***************************************
 *  DELETE Organisation
 *  [User must be the owner and will be deactivated]
 *************************************** */
export function deleteOrganisation(req, res) {
	debug('DELETE, called');

	// Is this user allowed to try and delete this org?
	if (((req.params.id === req.user.org_id) && (req.user.role === ADMIN)) || req.user.role === SUPER) {

		// Ok get the org to delete
		Organisation.findById(req.params.id, (err, organisation) => {
			if (err) {
				debug('DELETE, err: ' + JSON.stringify(err));
				res.status(500).send('error finding organisation : ' + JSON.stringify(err));
				return;
			}

			if (organisation) {

				// Deactivate organisation members
				User.updateMany({org_id: req.params.id}, {active: false}, (err) => {
					if (err) {
						debug('DELETE, err: ' + JSON.stringify(err));
						res.status(500).send('error deactivating members organisation : ' + JSON.stringify(err));
						return;
					}

					// Deactivate organisation
					organisation.active = false;

					organisation.save((err) => {
						if (err) {
							debug('DELETE, error saving organiosation');
							res.status(500).send(err);
							return;
						}
						debug('DELETE, success');
						res.sendStatus(200);
						return;
					});
				});
			} else {
				debug('DELETE, org: ' + req.params.id + ' not found for user: ' + req.user.id);
				res.status(404).send('no organisation found for account ' + req.user.id);
			}
		});
	} else {
		debug('DELETE, invalid delete from user: ' + req.user.id + ', deleting org: ' + req.params.id);
		res.status(403).send('User does not have permission to delete this org.');
	}
}
