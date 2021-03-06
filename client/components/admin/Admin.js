/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import AdminView from './AdminView';
import * as actions from '../../actions';
import Debug from 'debug';

let debug = Debug('Admin');

const mapStateToProps = (state) => {
	debug('mapStateToProps: called');
	return {
		profile:	state.auth.profile,
		isworking:	state.org.isworking,
		err:		state.org.err
	};
};

const Admin = connect(mapStateToProps)(AdminView);

export default Admin;
