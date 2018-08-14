/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import * as types from './action_types';
import * as services from '../services';
import Debug from 'debug';

let debug = Debug('auth_actions');

export const login = (email, password) => ({type: types.LOGIN, promise: services.login(email, password)});
export const authenticate = (email, password) => ({ type: types.AUTHENTICATE, payload: {email, password}});
export const logout = () => ({ type: types.LOGOUT, promise: services.logout()});
export const signup = (firstName, lastName, organisation, email, password) => ({ type: types.SIGNUP, promise: services.signup(firstName, lastName, organisation, email, password)});
