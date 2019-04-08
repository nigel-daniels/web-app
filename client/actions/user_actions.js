/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import * as actions from './action_types';

export const addUser = (user, organisation) => ({ type: actions.ADD_USER, payload: {user, organisation}});
export const inviteUser = (user) => ({ type: actions.INVITE_USER, payload: user});
export const getUser = (id) => ({ type: actions.GET_USER, payload: id });
export const getUsers = (org_id) => ({ type: actions.GET_USERS, payload: org_id });
export const updateUser = (id, firstName, lastName, email, org_id, role) => ({ type: actions.UPDATE_USER, payload: {id, firstName, lastName, email, org_id, role} });
export const deleteUser = (id) => ({ type: actions.DELETE_USER, payload: id });
