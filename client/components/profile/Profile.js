/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import ProfileView from './ProfileView';
import * as actions from '../../actions';
import Debug from 'debug';

let debug = Debug('Profile');

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
		changePassword: (password) => {dispatch(actions.changePassword(password));},
		closeAccount: (id) => {dispatch(actions.closeAccount(id));}

	};
};

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileView);

export default Profile;
