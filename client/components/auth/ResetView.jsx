/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {passwordPattern} from '../constants';
import {Cookies} from './modals/Cookies';

import Debug from 'debug';

let debug = Debug('ResetView');

class ResetView extends Component {

	componentDidMount() {
		debug('componentDidMount, called.');
		var id = $('#app-script').attr('id');

		debug('componentDidMount, activate tooltips.');
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});

		debug('componentDidMount, set validator on reset-form.');
		$('#reset-form').validator()
			.on('submit', (event) => {
				debug('reset, submit event = ' + event);
				if (!event.isDefaultPrevented()) {
					event.preventDefault();  // Stop us from navigating away b4 request is done
					this.props.reset(id, $('#password').val());
				}
			})
			.off('input.bs.validator change.bs.validator focusout.bs.validator');
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

	render() {
		debug('render, called.');

	    if (this.props.isworking) {
	      	return null;
	    } else {
	  		if (this.props.loggedin) {
	  			debug('render, loggedin true, redirecting to \'/home\'.');
	  			return <Redirect to={{ pathname: '/home' }} />;
	  		}
	  		else {
	  			debug('render, loggedin false, rendering login view.');
	  			debug('render, props: ' + JSON.stringify(this.props));
	  			return 	<div className="container-fluid">
	  				<div className="row">
	  					<div className="col-md-4"></div>
	  					<div className="col-md-4">
	  						<div className="login-brand">
	  							<div className="row">
	  								<span className="col-xs-2 login-logo">
	  									<img alt="Logo" src="images/saic.png" height="40" width="40"/>
	  								</span>
	  								<span className="col-xs-10 login-main-title">
	  									<h1>Web App Demo</h1>
	  								</span>
	  							</div>
	  						</div>
	  						<div className="panel panel-default login-panel">
	  							<div className="panel-heading">
	  								<h2 className="panel-title login-title">Reset Password</h2>
	  							</div>
	  							<div className="panel-body">

	  								<div className="login-view">
										<form className="form-horizontal reset-form" id="reset-form">
											<div className="form-group input-block-ico">
												<label htmlFor="password" className="sr-only">Password</label>
												<div className="input-group" data-toggle="tooltip" title="Password must contain one or more upper case, lower case, number/special characters and be at least 8 characters long to be valid.">
													<div className="input-group-prepend login-name-addon">
														<span className="input-group-text">
															<span className="fa fa-key" aria-hidden="true"/>
														</span>
													</div>
													<input type="password" id="password" pattern={passwordPattern} className="form-control" tabIndex={55} placeholder="Password" data-error="A valid password is required." required/>
												</div>
												<div className="input-group">
													<div className="input-group-prepend login-name-addon">
														<span className="input-group-text">
															<span className="fa fa-key" aria-hidden="true"/>
														</span>
													</div>
													<input type="password" id="password2" pattern={passwordPattern} className="form-control" tabIndex={60} placeholder="Validate password" data-error="A confirmation password is required." data-match="#password" data-match-error="The passwords do not match." required/>
												</div>
												<span className="help-block with-errors"></span>
											</div>
											<div className="form-group">
												<button className="btn btn-primary btn-block" type="submit" id="reset" tabIndex={80}>Reset</button>
											</div>
										</form>
										<div className="row login-footer">
											<div className="col-md-6 login-footer-left">
												<a id="reset-login" href="/" tabIndex={100}>Go to Login</a>
											</div>
										</div>
									</div>

	  							</div>
	  						</div>
	  					</div>
	  					<div className="col-md-4"></div>
	  				</div>
	  				<div className="footer">
	  					<p>
	  						<span className="glyphicon glyphicon-copyright-mark" aria-hidden="true"></span> 2019 Nigel Daniels <a href="#" data-toggle="modal" data-target="#cookies-modal">Cookie Policy</a>
	  					</p>
	  				</div>
					<Cookies/>
	  			</div>;
	  		}
	    }
	}
};

ResetView.propTypes = {
	isworking:	PropTypes.bool,
	loggedin:	PropTypes.bool,
	err:		PropTypes.string,

	reset:      PropTypes.func
};

export default ResetView;
