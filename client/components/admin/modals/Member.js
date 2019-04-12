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
	debug('mapStateToProps: called');
	return {
		err:			state.org.err,
		selectedMember:	state.org.selectedMember
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		updateMember: (id, firstName, lastName, email, org_id, role) => {dispatch(actions.updateMember(id, firstName, lastName, email, org_id, role));},
		closeMemberAccount: (id) => {dispatch(actions.closeAccount(id));}
	};
};

const Member = connect(mapStateToProps, mapDispatchToProps)(MemberView);

export default Member;
