/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import DetailsView from './DetailsView';
import * as actions from '../../../actions';
import Debug from 'debug';

let debug = Debug('Details');

const mapStateToProps = (state) => {
	debug('mapStateToProps: called');
	return {
		isworking:	state.auth.isworking,
		profile:	state.auth.profile
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		updateProfile: (id, firstName, lastName, email, org_id, role) => {dispatch(actions.updateProfile(id, firstName, lastName, email, org_id, role));},
		closeAccount: (id) => {dispatch(actions.deleteUser(id));}
	};
};

const Details = connect(mapStateToProps, mapDispatchToProps)(DetailsView);

export default Details;
