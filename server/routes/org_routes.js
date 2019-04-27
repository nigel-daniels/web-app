/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {isAuthenticated, postOrg, getOrg, getOrgs, getOrgById, getOrgMembers, getAllMembers, putOrg, deleteOrg} from '../services';

export default function (app) {
	// Post happens during authentication process
	app.post('/org', isAuthenticated, postOrg);
	app.get('/org', isAuthenticated, getOrg);
	app.get('/orgs', isAuthenticated, getOrgs);
	app.get('/org/:id', isAuthenticated, getOrgById);
	app.get('/org/:id/members', isAuthenticated, getOrgMembers);
	app.get('/members', isAuthenticated, getAllMembers);
	app.put('/org/:id', isAuthenticated, putOrg);
	app.delete('/org/:id', isAuthenticated, deleteOrg);
}
