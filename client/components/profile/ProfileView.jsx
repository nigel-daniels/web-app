/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import Debug from 'debug';

import { Main } from '../Main';

let debug = Debug('ProfileView');

class Profile extends Component {
	render () {

		debug('render, called.');
	    if (this.props.isworking) {
	      return null;
	    } else {
	  		return 	<Main>
	  			<h4>Profile page content!</h4>
	  		</Main>;
	  }
	}
}

ProfileView.propTypes = {
	isworking:		PropTypes.bool,
	loggedin:		PropTypes.bool,
	user:			PropTypes.object,
	err:			PropTypes.string,

	saveUser: 		PropTypes.func,
	deleteUser: 	PropTypes.func,
	changePassword:	PropTypes.func
};

export default ProfileView;
