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
							<a className="nav-link active" id="details-tab" data-toggle="tab" href="#details" role="tab" aria-controls="home" aria-selected="true">My Details</a>
						</li>
						<li className="nav-item">
					    	<a className="nav-link" id="password-tab" data-toggle="tab" href="#password" role="tab" aria-controls="profile" aria-selected="false">Password</a>
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
	isworking:		PropTypes.bool
};

export default ProfileView;
