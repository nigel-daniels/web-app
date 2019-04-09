/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import CloseAccountView from './CloseAccountView';
import * as actions from '../../../actions';
import Debug from 'debug';

let debug = Debug('CloseAccount');

const mapStateToProps = (state) => {
	debug('mapStateToProps: called');
	return {
		profile:	state.auth.profile
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		closeAccount: (id) => {dispatch(actions.closeAccount(id));}
	};
};

const CloseAccount = connect(mapStateToProps, mapDispatchToProps)(CloseAccountView);

export default CloseAccount;
