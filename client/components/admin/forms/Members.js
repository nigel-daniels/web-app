/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import MembersView from './MembersView';
import * as actions from '../../../actions';
import Debug from 'debug';

let debug = Debug('Details');

const mapStateToProps = (state) => {
	debug('mapStateToProps: called');
	return {
		isworking:	state.org.isworking,
		org:		state.org.org,
		members:	state.org.members
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		getMembers: (org_id) => {dispatch(actions.getMembers(org_id));},
	};
};

const Members = connect(mapStateToProps, mapDispatchToProps)(MembersView);

export default Members;
