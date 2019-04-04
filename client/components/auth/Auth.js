/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import AuthView from './AuthView';
import * as actions from '../../actions';
import Debug from 'debug';

let debug = Debug('Auth');

const mapStateToProps = (state) => {
	debug('mapStateToProps: called');
	return {
		isworking:	state.auth.isworking,
		loggedin: 	state.auth.loggedin,
		err:		state.auth.err
	};
};

const Auth = connect(mapStateToProps, null)(AuthView);

export default Auth;
