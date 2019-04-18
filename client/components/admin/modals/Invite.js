/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import InviteView from './InviteView';
import {invite} from '../../../actions';
import Debug from 'debug';

let debug = Debug('Invite');

const mapStateToProps = (state) => {
	debug('mapStateToProps, called');
	return {
		isworking:		state.org.isworking,
		err:			state.org.err
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		invite: (email) => {dispatch(invite(email));}
	};
};

const Invite = connect(mapStateToProps, mapDispatchToProps)(InviteView);

export default Invite;
