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
		profile:	state.auth.profile,
		org:		state.org.org,
		members:	state.org.members,
		selectedMember: state.org.selectedMember
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		getMembers: (org_id) => {dispatch(actions.getMembers(org_id));},
		getSelectedMember: (id, callback) => {dispatch(actions.getSelectedMember(id)).then(callback);}
	};
};

const Members = connect(mapStateToProps, mapDispatchToProps)(MembersView);

export default Members;
