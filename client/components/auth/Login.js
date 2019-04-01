/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import LoginView from './LoginView';
import * as actions from '../../actions';
import Debug from 'debug';

let debug = Debug('Login');

const mapStateToProps = (state) => {
	debug('mapStateToProps: called');
	return {
		isworking:	state.auth.isworking,
		loggedin: 	state.auth.loggedin,
		err:		    state.auth.err
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	debug('mapDispatchToProps, dispatch: ' + JSON.stringify(dispatch));
	return {
		login: (email, password) => {dispatch(actions.login(email, password));},
		signup: (firstName, lastName, organisation, email, password) => {dispatch(actions.signup(firstName, lastName, organisation, email, password));}
	};
};

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginView);

export default Login;
