/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import AdminOrganisationView from './AdminOrganisationView';
import * as actions from '../../../actions';
import Debug from 'debug';

let debug = Debug('Organisation');

const mapStateToProps = (state) => {
	debug('mapStateToProps: called');
	return {
		isworking:	state.org.isworking,
		org:		state.org.org
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		updateOrg: (id, name) => {dispatch(actions.updateOrg(id, name));},
	};
};

const AdminOrganisation = connect(mapStateToProps, mapDispatchToProps)(AdminOrganisationView);

export default AdminOrganisation;