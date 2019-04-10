/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import * as services from '../services';

export default function (app) {
	// Post happens during authentication process
	app.post('/org', services.isAuthenticated, services.postOrg);
	app.get('/org', services.isAuthenticated, services.getOrg);
	app.get('/org', services.isAuthenticated, services.getOrgs);
	app.get('/org/:id', services.isAuthenticated, services.getOrgById);
	app.get('/org/:id/members', services.isAuthenticated, services.getOrgMembers);
	app.put('/org/:id', services.isAuthenticated, services.putOrg);
	app.delete('/org/:id', services.isAuthenticated, services.deleteOrg);
}
