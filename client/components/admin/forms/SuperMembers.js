/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import SuperMembersView from './SuperMembersView';
import * as actions from '../../../actions';
import Debug from 'debug';

let debug = Debug('Details');

const mapStateToProps = (state) => {
	debug('mapStateToProps: called');
	return {
		loadingMembers:	state.org.loadingMembers,
		profile:		state.auth.profile,
		org:			state.org.org,
		members:		state.org.members,
		err: 			state.org.err
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		getAllMembers: () => {dispatch(actions.getAllMembers());},
		getSelectedMember: (id, callback) => {dispatch(actions.getSelectedMember(id)).then(callback);}
	};
};

const SuperMembers = connect(mapStateToProps, mapDispatchToProps)(SuperMembersView);

export default SuperMembers;
