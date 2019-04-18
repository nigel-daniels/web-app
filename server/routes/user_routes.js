/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {isAuthenticated, getUser, getUsers, getUserById, putUser, deleteUser} from '../services';

export default function (app) {
	// Post happens as part of the signup or invite authentication services
	app.get('/user', isAuthenticated, getUser);
	app.get('/users', isAuthenticated, getUsers);
	app.get('/user/:id', isAuthenticated, getUserById);
	app.put('/user/:id', isAuthenticated, putUser);
	app.delete('/user/:id', isAuthenticated, deleteUser);
}
