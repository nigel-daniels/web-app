/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import SuperOrganisationView from './SuperOrganisationView';
import * as actions from '../../../actions';
import Debug from 'debug';

let debug = Debug('SuperOrganisation');

const mapStateToProps = (state) => {
	debug('mapStateToProps: called');
	return {
		loadingOrgs:	state.org.loadingOrgs,
		orgs:			state.org.orgs,
		err: 			state.org.err
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		getOrgs: () => {dispatch(actions.getOrgs());},
		getSelectedOrg: (id) => {dispatch(actions.getSelectedOrg(id));},
		updateOrgSuper: (id, name) => {dispatch(actions.updateOrgSuper(id, name));},
	};
};

const SuperOrganisation = connect(mapStateToProps, mapDispatchToProps)(SuperOrganisationView);

export default SuperOrganisation;
