/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import LoginView from './LoginView';
import * as actions from '../../../actions';
import Debug from 'debug';

let debug = Debug('Login');

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		login: (email, password) => {dispatch(actions.login(email, password));}
	};
};

const Login = connect(null, mapDispatchToProps)(LoginView);

export default Login;
