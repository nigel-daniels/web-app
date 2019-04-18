/**
 * Copyright (c) 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import Organisation from '../models/Organisation';
import User, {ADMIN, SUPER} from '../models/User';
import Debug from 'debug';

const debug = Debug('org_service');

/* ***************************************
 *  POST Organisation
 * ***************************************/
export function postOrg(req, res) {
	debug('POST, called');

	if (req.body.name && req.body.name) {

		Organisation.find({name: req.body.name}, (err, org) => {
			if (err) {
				debug('POST, err: ' + JSON.stringify(err));
				return res.status(500).send({message: 'error finding organisation : ' + err.message});
			}

			if (org) {
				debug('POST, organisation exists with the name: ' + req.body.name);
				return res.status(400).SendStream({message: 'An organisation with the name ' + req.body.name + ' already exists.'});
			}

			Organisation.create({name: req.body.name, parent: req.body.parent}, (err, newOrg) => {
				if (err) {
					debug('POST, error ' + JSON.stringify(err));
					return res.status(500).send({message: 'Error creating organisation: ' + err.message});
				}

				debug('POST, success');
				return res.status(201).send({org: newOrg});
			});
		});
	} else {
		debug('POST, name provided invalid name: ' + req.body.name);
		return res.status(400).send({message: 'Invalid name for organisation: ' + req.body.name});
	}
}

/* ***************************************
 *  GET The organisation the user is a member of
 * ***************************************/
export function getOrg(req, res) {
	debug('GET, called');

	Organisation.findById(req.user.org_id, (err, org) => {
		if (err) {
			debug('GET, err: ' + JSON.stringify(err));
			return res.status(500).send({message: 'error finding organisation : ' + err.message});
		}

		if (org) {
			debug('GET, success');
			return res.status(200).send({org: org});
		} else {
			debug('GET, org: ' + req.user.org_id + ' not found for user: ' + req.user.id);
			return res.status(404).send({message: 'no organisation found for account ' + req.user.id});
		}

	});
}

/* ***************************************
 *  GET organisations
 * ***************************************/
export function getOrgs(req, res) {
	debug('GET:*, called');

	if (req.user.role === SUPER) {
		Organisation.find({}, (err, orgs) => {
			if (err) {
				debug('GET:*, err: ' + JSON.stringify(err));
				return res.status(500).send({message: 'error finding organisations : ' + JSON.stringify(err)});
			}

			if (orgs) {
				debug('GET:*, success');
				return res.send(orgs);
			} else {
				debug('GET:*, org: no organisations found.');
				return res.status(404).send({message: 'no organisations found.'});
			}
		});
	} else {
		debug('GET:*, invalid access from user: ' + req.user.id + ', requesting orgs: ' + req.params.id);
		return res.status(403).send({message: 'organisations not valid for user: ' + req.user.id});
	}
}

/* ***************************************
 *  GET organisation by provided id
 * ***************************************/
export function getOrgById(req, res) {
	debug('GET:id, called');

	if ((req.user.org_id.equals(req.params.id)) || (req.user.role === SUPER)) {
		Organisation.findById(req.params.id, (err, org) => {
			if (err) {
				debug('GET:id, err: ' + JSON.stringify(err));
				return res.status(500).send({message: 'error finding organisation : ' + err.message});
			}

			if (org) {
				debug('GET:id, success');
				return res.send({org: org});
			} else {
				debug('GET:id, org: ' + req.params.id + ' not found.');
				return res.status(404).send({message: 'no organisation found with the provided id.'});
			}
		});
	} else {
		debug('GET:id, invalid access from user: ' + req.user.id + ', requesting org: ' + req.params.id);
		return res.status(403).send({message: 'organisation not valid for user: ' + req.user.id});
	}
}

/* ***************************************
 *  GET organisation (active) members
 * ***************************************/
export function getOrgMembers(req, res) {
	debug('GET:id/members, called');
	debug('GET:id/members, org_id: ' + req.user.org_id);
	debug('GET:id/members, req id: ' + req.params.id);
	if ((req.user.org_id.equals(req.params.id)) || (req.user.role === SUPER)) {
		User.find({org_id: req.params.id, active: true}, (err, members) => {
			if (err) {
				debug('GET:id/members, err: ' + JSON.stringify(err));
				return res.status(500).send({message: 'error finding organisation members: ' + err.message});
			}

			debug('GET:id/members, success');
			return res.status(200).send({members: members});
		});
	} else {
		debug('GET:id/members, invalid request from user: ' + req.user.id);
		return res.status(403).send({message: 'User does not have permission to see these organisation members'});
	}
}

/* ***************************************
 *  PUT Organisation
 *************************************** */
export function putOrg(req, res) {
	debug('PUT, called');
	debug('PUT, params ' + JSON.stringify(req.params));
	// Check the user belongs to this org
	if (req.user.org_id.equals(req.params.id)) {
		// Ok let's get the org to update
		Organisation.findById(req.params.id, (err, org) => {
			if (err) {
				debug('PUT, err: ' + JSON.stringify(err));
				return res.status(500).send({message: 'Error finding organisation : ' + err.message});
			}

			// Let's do the update
			if (org) {
				org.name = req.body.name;

				org.save((err) => {
					if (err) {
						debug('PUT, error saving organisation');
						return res.status(500).send({message: 'Error creating organisation: ' + err.message});
					}

					debug('PUT, success');
					return res.status(200).send({org: org});
				});
			} else {
				debug('GET:*, org: no organisations found.');
				return res.status(404).send({message: 'no organisations found.'});
			}
		});
	} else {
		debug('PUT, invalid update from user: ' + req.user.id + ', updating org: ' + req.params.id);
		return res.status(403).send({message: 'organisation not valid for user: ' + req.user.id});
	}
}

/* ***************************************
 *  DELETE Organisation
 *  [User must be the owner and will be deactivated]
 *************************************** */
export function deleteOrg(req, res) {
	debug('DELETE, called');

	// Is this user allowed to try and delete this org?
	if (((req.user.org_id.equals(req.params.id)) && (req.user.role === ADMIN)) || req.user.role === SUPER) {

		// Ok get the org to delete
		Organisation.findById(req.params.id, (err, org) => {
			if (err) {
				debug('DELETE, err: ' + JSON.stringify(err));
				return res.status(500).send({message: 'error finding organisation : ' + err.message});
			}

			if (org) {

				// Deactivate organisation members
				User.updateMany({org_id: req.params.id}, {active: false}, (err) => {
					if (err) {
						debug('DELETE, err: ' + JSON.stringify(err));
						return res.status(500).send({message: 'error deactivating members organisation : ' + err.message});
					}

					// Deactivate organisation
					org.active = false;

					org.save((err) => {
						if (err) {
							debug('DELETE, error saving organiosation');
							return res.status(500).send({message: 'Error saving change: ' + err.message});
						}
						debug('DELETE, success');
						return res.status(200).send({message: 'Success!'});
					});
				});
			} else {
				debug('DELETE, org: ' + req.params.id + ' not found for user: ' + req.user.id);
				return res.status(404).send({message: 'no organisation found for account ' + req.user.id});
			}
		});
	} else {
		debug('DELETE, invalid delete from user: ' + req.user.id + ', deleting org: ' + req.params.id);
		return res.status(403).send({message: 'User does not have permission to delete this org.'});
	}
}
