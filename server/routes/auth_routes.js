/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {signup, forgotPassword, getResetPage, resetPassword, login, authenticate, logout} from '../services';

export default function (app, passport) {
	app.post('/signup', signup);
	//	app.post('/invite', services.invite);
	//	app.get('/accept', services.getAcceptPage);
	//	app.post('/accept', services.acceptInvite);

	app.post('/forgot', forgotPassword);
	app.get('/reset', getResetPage);
	app.post('/reset', resetPassword);

	app.post('/login', 	passport.authenticate('local'), login);
	app.get('/authenticate', authenticate);
	app.get('/logout', logout);

}
