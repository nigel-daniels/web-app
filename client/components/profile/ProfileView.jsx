/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { Main } from '../Main';
import Details from './forms/Details';
import Password from './forms/Password';

let debug = Debug('ProfileView');

class ProfileView extends Component {

	shouldComponentUpdate() {
		debug('shouldComponentUpdate, called.');
		return this.props.isworking;
	}

	componentDidUpdate() {
		debug('componentDidUpdate, check if there is an err then notify if there is.');
		if (this.props.err !== null) {
			$.notify({
				title: '<strong>Signup Error</strong>',
				icon: 'fa fa-exclamation-triangle',
				message: this.props.err
			},{
				type: 'danger'
			});
		}
	}

  	render () {
    	debug('render, called.');
    	if (this.props.isworking) {
      		return null;
    	} else {
  			return 	<Main>
				<div id="profile" className="page-content">
					<h4 className="content-heading">Profile Page</h4>
					<ul className="nav nav-tabs" id="profile-tab" role="tablist">
						<li className="nav-item">
							<a className="nav-link active" id="details-tab" data-toggle="tab" href="#details" role="tab" aria-controls="details" aria-selected="true">My Details</a>
						</li>
						<li className="nav-item">
					    	<a className="nav-link" id="password-tab" data-toggle="tab" href="#password" role="tab" aria-controls="password" aria-selected="false">Password</a>
						</li>
					</ul>
					<div className="tab-content" id="profile-content">
						<div className="tab-pane fade show active" id="details" role="tabpanel" aria-labelledby="details-tab">
						  	<Details/>
						</div>
						<div className="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
							<Password/>
						</div>
					</div>
				</div>
  			</Main>;
	  	}
	}
};

ProfileView.propTypes = {
	isworking:		PropTypes.bool,
	err:			PropTypes.string
};

export default ProfileView;
