/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import DashboardView from './DashboardView';
import * as actions from '../../actions';
import Debug from 'debug';

let debug = Debug('Dashboard');

const mapStateToProps = (state) => {
	debug('mapStateToProps: called');
	return {
		isworking:	state.auth.isworking,
		err:		state.auth.err
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		updateOrg: (id, name) => {dispatch(actions.updateOrg(id, name));},
	};
};

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardView);

export default Dashboard;
