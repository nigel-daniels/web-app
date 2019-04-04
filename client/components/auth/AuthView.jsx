/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {Cookies} from './modals/Cookies';
import Login from './forms/Login';
import Signup from './forms/Signup';
import Forgot from './forms/Forgot';

import Debug from 'debug';

let debug = Debug('AuthView');

class AuthView extends Component {

	handleAction(event) {
		debug('handleAction, called.');

		switch ($(event.currentTarget).attr('id')) {
		case 'login-forgot':
			debug('handleAction, login-forgot.');
			$('.login-title').text('Forgot Password');
			$('.login-view').hide('slow');
			$('.forgot-view').show('slow');
			$('#forgot-name').focus();
			break;
		case 'forgot-login':
			debug('handleAction, forgot-login.');
			$('.login-title').text('Login');
			$('.forgot-view').hide('slow');
			$('.login-view').show('slow');
			$('#login-name').focus();
			break;
		case 'login-signup':
			debug('handleAction, login-signup.');
			$('.login-title').text('Sign Up');
			$('.login-view').hide('slow');
			$('.signup-view').show('slow');
			$('#first').focus();
			break;
		case 'signup-login':
			debug('handleAction, signup-login.');
			$('.login-title').text('Login');
			$('.signup-view').hide('slow');
			$('.login-view').show('slow');
			$('#login-name').focus();
			break;
		}
	}

	componentDidMount() {
		debug('componentDidMount, called.');
		//var _this = this;

		debug('componentDidMount, activate tooltips.');
		$(function () {
			$('[data-toggle="tooltip"]').popover();
		});
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

        const hidden = {display: 'none'};

		//const { from } = this.props.location.state || { from: { pathname: '/' }};
		debug('render loggedin = ' + this.props.loggedin);
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
	  								<h2 className="panel-title login-title">Login</h2>
	  							</div>
	  							<div className="panel-body">

	  								<div className="login-view">
                                        <Login/>
                                        <div className="row login-footer">
                                            <div className="col-md-6 login-footer-left">
                                                <a id="login-forgot" onClick={this.handleAction.bind(this)} tabIndex={15}>Forgot password?</a>
                                            </div>
                                            <div className="col-md-6 login-footer-right">
                                                <a id="login-signup" onClick={this.handleAction.bind(this)} tabIndex={20}>Create account?</a>
                                            </div>
                                        </div>
                                    </div>

	  								<div className="signup-view"  style={hidden}>
	  									<Signup/>
                                        <div className="row login-footer">
                                            <div className="col-md-6 login-footer-left">
                                                <a id="signup-login" onClick={this.handleAction.bind(this)} tabIndex={85}>Back to Login</a>
                                            </div>
                                        </div>
	  								</div>

	  								<div className="forgot-view"  style={hidden}>
	  									<p className="forgot-copy">This will send a message to your registered account e-mail address, allowing you to reset your password.</p>
	  									<Forgot/>
                                        <div className="row login-footer">
                                            <div className="col-md-6 login-footer-left">
                                                <a id="forgot-login" onClick={this.handleAction.bind(this)} tabIndex={100}>Back to Login</a>
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
	  						<span className="glyphicon glyphicon-copyright-mark" aria-hidden="true"></span> 2019 Nigel Daniels <a  href="#" data-toggle="modal" data-target="#cookies-modal">Cookie Policy</a>
	  					</p>
	  				</div>
					<Cookies/>
	  			</div>;
	  		}
	    }
	}
};

AuthView.propTypes = {
	isworking:	PropTypes.bool,
	loggedin:	PropTypes.bool,
	err:		PropTypes.string
};

export default AuthView;
