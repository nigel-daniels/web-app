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
		loggedin: 	state.auth.loggedin,
		profile:	state.auth.profile,
		err:		state.auth.err
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		updateProfile: (firstName, lastName, email) => {dispatch(actions.updateProfile(firstName, lastName, email));},
		closeAccount: (id) => {dispatch(actions.closeAccount(id));}
	};
};

const Details = connect(mapStateToProps, mapDispatchToProps)(DetailsView);

export default Details;
