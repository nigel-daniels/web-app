/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import PasswordView from './PasswordView';
import * as actions from '../../../actions';
import Debug from 'debug';

let debug = Debug('Password');

const mapStateToProps = (state) => {
	debug('mapStateToProps: called');
	return {
		profile:	state.auth.profile
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		changePassword: (id, password) => {dispatch(actions.changePassword(id, password));}
	};
};

const Password = connect(mapStateToProps, mapDispatchToProps)(PasswordView);

export default Password;
