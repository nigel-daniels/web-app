/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {passwordPattern} from '../../constants';
import Debug from 'debug';

import { Main } from '../../Main';

let debug = Debug('PasswordView');

class PasswordView extends Component {

	shouldComponentUpdate() {
		debug('shouldComponentUpdate, called.');
		return this.props.isworking;
	}

	componentDidMount() {
		debug('componentDidMount, called.');

		debug('componentDidMount, activate tooltips.');
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});

		debug('componentDidMount, set validator on signup-form.');
		$('#password-form').validator()
			.on('submit', (event) => {
				if (!event.isDefaultPrevented()) {
					event.preventDefault();
					this.props.changePassword(this.props.profile._id, $('#new-password').val());
				}
			})
			.off('input.bs.validator change.bs.validator focusout.bs.validator');
	}

  	render () {
    	debug('render, called.');

		debug('render, profile: ' + JSON.stringify(this.props.profile));
  		return 	<form className="form-horizontal" id="password-form">
			<div className="form-group row">
				<label htmlFor="current-password" className="col-sm-3 col-form-label">Current Password</label>
				<div className="col-sm-9">
					<input type="password" className="form-control" id="current-password" tabIndex={40} placeholder="Your current password." data-error="Your password is required." required/>
					<span className="help-block with-errors"></span>
				</div>
			</div>
			<div className="form-group row">
				<label htmlFor="new-password" className="col-sm-3 col-form-label">New Password</label>
				<div className="col-sm-9 form-group input-block" data-toggle="tooltip" title="Password must contain one or more upper case, lower case, number/special characters and be at least 8 characters long to be valid.">
					<input type="password" className="form-control" id="new-password" tabIndex={45} placeholder="Type new password." data-error="A valid password is required." required/>
					<input type="password" className="form-control" id="new-password2" pattern={passwordPattern} tabIndex={50} placeholder="Validate new password."  data-error="A valid password is required." data-match="#new-password" data-match-error="The passwords do not match." required/>
					<span className="help-block with-errors"></span>
				</div>
			</div>
			<div className="form-group row">
				<span className="col-sm-3"></span>
				<div className="col-sm-9">
					<button type="submit" tabIndex={55} className="btn btn-primary">Change</button>
				</div>
			</div>
		</form>;
	  	//}
	}
};

PasswordView.propTypes = {
	isworking:		PropTypes.bool,
	profile:		PropTypes.object,

	changePassword: 	PropTypes.func
};

export default PasswordView;
