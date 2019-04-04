/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import ResetView from './ResetView';
import * as actions from '../../actions';
import Debug from 'debug';

let debug = Debug('Reset');

const mapStateToProps = (state) => {
	debug('mapStateToProps: called');
	return {
		isworking:	state.auth.isworking,
		loggedin: 	state.auth.loggedin,
		err:		state.auth.err
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		reset: (email) => {dispatch(actions.reset(id, password));}
	};
};

const Reset = connect(mapStateToProps, mapDispatchToProps)(ResetView);

export default Reset;
