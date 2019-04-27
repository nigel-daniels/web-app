/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import OrganisationView from './OrganisationView';
import * as actions from '../../../actions';
import Debug from 'debug';

let debug = Debug('Organisation');

const mapStateToProps = (state) => {
	debug('mapStateToProps, called');
	return {
		isworking:		state.org.isworking,
		err:			state.org.err,
		selectedOrg:	state.org.selectedOrg
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		updateOrgSuper: (id, name) => {dispatch(actions.updateOrgSuper(id, name));}
	};
};

const Organisation = connect(mapStateToProps, mapDispatchToProps)(OrganisationView);

export default Organisation;
