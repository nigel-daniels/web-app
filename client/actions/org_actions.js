/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import * as index from '../index';
import * as actions from './action_types';
import * as services from '../services';

export const getUserOrg = () => ({ type: actions.GET_USER_ORG, promise: services.getUserOrg()});
export const getMembers = (org_id) => ({ type: actions.GET_MEMBERS, promise: services.getMembers(org_id)});
export const getSelectedMember = (id) => ({ type: actions.GET_SELECTED_MEMBER, promise: services.getSelectedMember(id)});
export const updateMember = (id, firstName, lastName, email, org_id, role) => ({ type: actions.UPDATE_MEMBER, promise: services.updateMember(id, firstName, lastName, email, org_id, role), meta: {onSuccess: () => index.store.dispatch(getMembers(org_id))}});
export const closeMemberAccount = (id) => ({ type: actions.CLOSE_MEMBER_ACCOUNT, promise: services.closeMemberAccount(id), meta: {onSuccess: (payload) => index.store.dispatch(getMembers(payload.user.org_id))}});
