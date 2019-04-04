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
		isworking:	state.auth.isworking
	};
};

const Profile = connect(mapStateToProps)(ProfileView);

export default Profile;
