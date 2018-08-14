/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import * as services from '../services';

export default function (app) {
	// Post happens during authentication process
	app.post('/organisation', services.isAuthenticated, services.postOrganisation);
	app.get('/organisation', services.isAuthenticated, services.getOrganisation);
	app.get('/organisations', services.isAuthenticated, services.getOrganisations);
	app.get('/organisation/:id', services.isAuthenticated, services.getOrganisationById);
	app.get('/organisation/:id/members', services.isAuthenticated, services.getOrganisationMembers);
	app.put('/organisation/:id', services.isAuthenticated, services.putOrganisation);
	app.delete('/organisation/:id', services.isAuthenticated, services.deleteOrganisation);
}
