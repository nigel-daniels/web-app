/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import MemberView from './MemberView';
import * as actions from '../../../actions';
import Debug from 'debug';

let debug = Debug('Member');

const mapStateToProps = (state) => {
	debug('mapStateToProps, called');
	return {
		isworking:		state.org.isworking,
		err:			state.org.err,
		profile:		state.auth.profile,
		selectedMember:	state.org.selectedMember
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		updateMemberAdmin: (id, firstName, lastName, email, org_id, role) => {dispatch(actions.updateMemberAdmin(id, firstName, lastName, email, org_id, role));},
		closeMemberAccountAdmin: (id) => {dispatch(actions.closeMemberAccountAdmin(id));},
		updateMemberSuper: (id, firstName, lastName, email, org_id, role) => {dispatch(actions.updateMemberSuper(id, firstName, lastName, email, org_id, role));},
		closeMemberAccountSuper: (id) => {dispatch(actions.closeMemberAccountSuper(id));}
	};
};

const Member = connect(mapStateToProps, mapDispatchToProps)(MemberView);

export default Member;
