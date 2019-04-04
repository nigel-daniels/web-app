/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import SignupView from './SignupView';
import * as actions from '../../../actions';
import Debug from 'debug';

let debug = Debug('Signup');

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		signup: (firstName, lastName, organisation, email, password) => {dispatch(actions.signup(firstName, lastName, organisation, email, password));}
	};
};

const Signup = connect(null, mapDispatchToProps)(SignupView);

export default Signup;
