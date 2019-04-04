/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {connect} from 'react-redux';
import MainMenuView from './MainMenuView';
import * as actions from '../actions';
import Debug from 'debug';

let debug = Debug('MainMenu');

const mapStateToProps = (state) => {
	debug('mapStateToProps: called');
	return {
		isworking:	state.auth.isworking,
		loggedin: 	state.auth.loggedin,
        profile:    state.auth.profile,
		err:		state.auth.err
	};
};

const mapDispatchToProps = (dispatch) => {
	debug('mapDispatchToProps, called');
	return {
		logout: () => {dispatch(actions.logout());}
	};
};

const MainMenu = connect(mapStateToProps, mapDispatchToProps)(MainMenuView);

export default MainMenu;
