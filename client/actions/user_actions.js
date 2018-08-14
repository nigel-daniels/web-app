/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import types from './action_types';

export const addUser = (user, organisation) => ({ type: types.ADD_USER, payload: {user, organisation}});
export const inviteUser = (user) => ({ type: types.INVITE_USER, payload: user});
export const getUser = (id) => ({ type: types.GET_USER, payload: id });
export const getUsers = (org_id) => ({ type: types.GET_USERS, payload: org_id });
export const updateUser = (user) => ({ type: types.UPDATE_USER, payload: user });
export const deleteUser = (id) => ({ type: types.DELETE_USER, payload: id });
