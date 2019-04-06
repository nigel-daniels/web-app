/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {start, signup, forgot, reset, resetPassword, login, loginRedirect, authenticate, logout} from '../services';

export default function (app, passport) {
	app.get('/', start);
	app.post('/signup', signup);
	//	app.post('/invite', services.invite);
	//	app.get('/accept', services.getAcceptPage);
	//	app.post('/accept', services.acceptInvite);

	app.post('/forgot', forgot);
	app.get('/reset/:id', reset);
	app.put('/reset/:id', resetPassword);

	app.post('/login', login);
	app.get('/login', loginRedirect);
	app.get('/authenticate', authenticate);
	app.get('/logout', logout);

}
