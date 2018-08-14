/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import * as services from '../services';

export default function (app) {
	// Post happens as part of the signup or invite authentication services
	app.get('/user', services.isAuthenticated, services.getUser);
	app.get('/users', services.isAuthenticated, services.getUsers);
	app.get('/user/:id', services.isAuthenticated, services.getUserById);
	app.put('/user/:id', services.isAuthenticated, services.putUser);
	app.delete('/user/:id', services.isAuthenticated, services.deleteUser);
}
