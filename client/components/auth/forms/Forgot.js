/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import ForgotView from './ForgotView';
import * as actions from '../../../actions';
import Debug from 'debug';

let debug = Debug('Forgot');

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		forgot: (email) => {dispatch(actions.signup(email));}
	};
};

const Forgot = connect(null, mapDispatchToProps)(ForgotView);

export default Forgot;
