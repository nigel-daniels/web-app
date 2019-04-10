/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import * as actions from './action_types';
import * as services from '../services';

export const getUserOrg = () => ({ type: actions.GET_USER_ORG, promise: services.getUserOrg()});
