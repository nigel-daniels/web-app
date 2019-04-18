/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {start, signup, login, loginRedirect, authenticate, forgot, reset,
	resetPassword, isAuthenticated, changePassword, invite, getAcceptPage,
	acceptInvite, logout} from '../services';

export default function (app, passport) {
	app.get('/', start);
	app.post('/signup', signup);
	//	app.post('/invite', services.invite);
	//	app.get('/accept', services.getAcceptPage);
	//	app.post('/accept', services.acceptInvite);

	app.post('/login', login);
	app.get('/login', loginRedirect);
	app.get('/authenticate', authenticate);

	app.post('/forgot', forgot);
	app.get('/reset/:id', reset);
	app.post('/reset/:id', resetPassword);

	app.put('/change/:id', isAuthenticated, changePassword);

	app.post('/invite', isAuthenticated, invite);
	app.get('/accept', getAcceptPage);
	app.post('/accept', acceptInvite);

	app.get('/logout', logout);

}
