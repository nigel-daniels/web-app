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
		user:		state.auth.user,
		err:		state.auth.err
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		saveUser: (firstName, lastName, email) => {dispatch(actions.saveUser(firstName, lastName, email));},
		deleteUser: (id) => {dispatch(actions.deleteUser(firstName, lastName, email));},
		changePassword: (password) => {dispatch(actions.changePassword(password));}
	};
};

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileView);

export default Profile;
