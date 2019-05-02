/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import AdminMembersView from './AdminMembersView';
import * as actions from '../../../actions';
import Debug from 'debug';

let debug = Debug('AdminMembers');

const mapStateToProps = (state) => {
	debug('mapStateToProps: called');
	return {
		loadingMembers:	state.org.loadingMembers,
		profile:		state.auth.profile,
		org:			state.org.org,
		members:		state.org.members,
		err: 			state.auth.err
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		getMembers: (org_id) => {dispatch(actions.getMembers(org_id));},
		getSelectedMember: (id, callback) => {dispatch(actions.getSelectedMember(id)).then(callback);}
	};
};

const AdminMembers = connect(mapStateToProps, mapDispatchToProps)(AdminMembersView);

export default AdminMembers;
