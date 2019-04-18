/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import * as index from '../index';
import * as actions from './action_types';
import * as org from './org_actions';
import * as services from '../services';

export const login = (email, password) => ({type: actions.LOGIN, promise: services.login(email, password), meta: {onSuccess: () => index.store.dispatch(org.getUserOrg())}});
export const authenticate = (email, password) => ({ type: actions.AUTHENTICATE, payload: {email, password}});
export const logout = () => ({ type: actions.LOGOUT, promise: services.logout()});
export const signup = (firstName, lastName, organisation, email, password) => ({ type: actions.SIGNUP, promise: services.signup(firstName, lastName, organisation, email, password)});
export const forgot = (email) => ({ type: actions.FORGOT, promise: services.forgot(email)});
export const reset = (id, password) => ({ type: actions.RESET, promise: services.forgot(id, password)});
export const updateProfile = (id, firstName, lastName, email, org_id, role) =>  ({ type: actions.UPDATE_PROFILE, promise: services.updateProfile(id, firstName, lastName, email, org_id, role)});
export const changePassword = (id, password) => ({ type: actions.CHANGE_PASSWORD, promise: services.changePassword(id, password)});
export const invite = (email, org_id) => ({type: actions.INVITE, promise: services.invite(email, org_id)});
export const closeAccount = (id) => ({type: actions.CLOSE_ACCOUNT, promise: services.closeAccount(id), meta: {onSuccess: () => index.store.dispatch(logout())}});
