/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import Debug from 'debug';

let debug = Debug('LoginView');

class LoginView extends Component {

	signup() {
		debug('signup, called');
		debug('username: ' + $('#username').val());
		$.post('/signup', {
			firstName: $('#firstName').val(),
			lastName: $('#lastName').val(),
			organisation: $('#organisation').val(),
			email: $('#email').val(),
			password: $('#password').val()
		}).done(() => {
			$('.login-title').text('Login');
			$('.signup-view').hide('slow');
			$('.login-view').show('slow');
			$('#login-name').focus();
		}).fail((err) => {
			debug('signup fail: ' + err.responseText);
			$.notify({
				title: '<strong>Signup Error</strong>',
				icon: 'fa fa-exclamation-triangle',
				message: err.responseText
			},{
				type: 'danger'
			});
		});
	}

	forgot() {
		debug('forgot, called');
		$.post('/forgot', {
			email: $('#forgot-email').val()
		}).done(() => {
			$.notify({
				title: '<strong>Forgot password</strong>',
				icon: 'fa fa-lock',
				message: 'The reset email has been sent.'
			});

			$('.login-title').text('Login');
			$('.forgot-view').hide('slow');
			$('.login-view').show('slow');
			$('#login-name').focus();
		}).fail((err) => {
			debug('forgot, error: ' + JSON.stringify(err));
			$.notify({
				title: '<strong>Forgot Password Error</strong>',
				icon: 'fa fa-exclamation-triangle',
				message: err.responseText
			},{
				type: 'danger'
			});
		});
	}

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
		var _this = this;

		debug('componentDidMount, activate tooltips.');
		$(function () {
			$('[data-toggle="tooltip"]').popover();
		});


		debug('componentDidMount, set validator on login-form.');
		$('#login-form').validator()
			.on('submit', (event) => {
				debug('login, submit event = ' + event);
				if (!event.isDefaultPrevented()) {
					event.preventDefault();  // Stop us from navigating away b4 request is done
					this.props.login($('#login-email').val(), $('#login-password').val());
				}
			})
			.off('input.bs.validator change.bs.validator focusout.bs.validator');

		debug('componentDidMount, set validator on signup-form.');
		$('#signup-form').validator()
			.on('submit', (event) => {
				if (!event.isDefaultPrevented()) {
					event.preventDefault();
					this.props.signup($('#firstName').val(), $('#lastName').val(),
						$('#organisation').val(), $('#email').val(), $('#password').val());
				}
			})
			.off('input.bs.validator change.bs.validator focusout.bs.validator');

		debug('componentDidMount, set validator on forgot-form.');
		$('#forgot-form').validator()
			.on('submit', (event) => {
				if (!event.isDefaultPrevented()) {
					event.preventDefault();
					this.forgot(event.originalEvent);
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

		const passwordPattern = '(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$';

		const rfc5322 = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\' +
					'x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9]' +
					'(?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4]' +
					'[0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]' +
					')|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\' +
					'x0b\\x0c\\x0e-\\x7f])+)\\])';

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
  									<form className="form-horizontal login-form" id="login-form">
  										<div className="form-group input-block-ico">
  											<div className="input-group login-email-group">
  												<div className="input-group-prepend login-email-addon">
  													<span className="input-group-text">
  														<span className="fa fa-envelope-o" aria-hidden="true"/>
  													</span>
  												</div>
  												<input type="email"  pattern={rfc5322} className="form-control login-email-input" id="login-email" tabIndex={1} placeholder="Login e-mail" data-error="The login e-mail is required." required autoFocus/>
  											</div>
  											<div className="input-group login-password-group">
  												<div className="input-group-prepend login-password-addon">
  													<span className="input-group-text">
  														<span className="fa fa-lock" aria-hidden="true"/>
  													</span>
  												</div>
  												<input type="password" className="form-control login-password-input" id="login-password" tabIndex={5} data-error="The password is required." placeholder="Password" required/>
  											</div>
  											<span className="help-block with-errors"></span>
  										</div>
  										<div className="form-group">
  											<button type="submit" className="btn btn-primary btn-block" id="login" tabIndex={10}>Sign in</button>
  										</div>
  									</form>
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
  									<form className="form-horizontal signup-form" id="signup-form">
  										<div className="form-group input-block-ico">
  											<label htmlFor="first" className="sr-only">Your Name</label>
  											<div className="input-group">
  												<div className="input-group-prepend login-name-addon">
  													<span className="input-group-text">
  														<span className="fa fa-user" aria-hidden="true"/>
  													</span>
  												</div>
  												<input type="text" id="firstName" className="form-control" tabIndex={25} placeholder="First/Given name"  data-error="A first/given name is required." required/>
  											</div>
  											<div className="input-group">
  												<div className="input-group-prepend login-name-addon">
  													<span className="input-group-text">
  														<span className="fa fa-user" aria-hidden="true"/>
  													</span>
  												</div>
  												<input type="text" id="lastName" className="form-control" tabIndex={30} placeholder="Last/Family name" data-error="A last/family name is required." required/>
  											</div>
  											<span className="help-block with-errors"></span>
  										</div>
  										<div className="form-group">
  											<label htmlFor="organisation" className="sr-only">Organisation Name</label>
  											<div className="input-group">
  												<div className="input-group-prepend login-name-addon">
  													<span className="input-group-text">
  														<span className="fa fa-building" aria-hidden="true"/>
  													</span>
  												</div>
  												<input type="text" id="organisation" className="form-control" tabIndex={40} placeholder="Organisation name (optional)"/>
  											</div>
  										</div>
  										<div className="form-group input-block-ico">
  											<label htmlFor="email" className="sr-only">Email address</label>
  											<div className="input-group">
  												<div className="input-group-prepend login-name-addon">
  													<span className="input-group-text">
  														<span className="fa fa-envelope-o" aria-hidden="true"/>
  													</span>
  												</div>
  												<input type="email" id="email" pattern={rfc5322} className="form-control" tabIndex={45} placeholder="E-mail" data-error="A valid e-mail is required." required/>
  											</div>
  											<div className="input-group">
  												<div className="input-group-prepend login-name-addon">
  													<span className="input-group-text">
  														<span className="fa fa-envelope-o" aria-hidden="true"/>
  													</span>
  												</div>
  												<input type="email" id="email2" pattern={rfc5322} className="form-control" tabIndex={50} placeholder="Validate e-mail" data-error="A confirmation e-mail is required." data-match="#email" data-match-error="The e-mails do not match." required/>
  											</div>
  											<span className="help-block with-errors"></span>
  										</div>
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
  											<input type="checkbox" id="terms" tabIndex={70} data-error="You need to read and agree to the terms and conditions." required/> I agree to the <a id="termsLink">terms and conditions.</a>
  											<span className="help-block with-errors"></span>
  										</div>
  										<div className="form-group">
  											<input type="checkbox" id="privacy" tabIndex={75} data-error="You need to read agree to the privacy policy." required/> I agree to the <a id="privacyLink">privacy policy.</a>
  											<span className="help-block with-errors"></span>
  										</div>
  										<div className="form-group">
  											<button className="btn btn-primary btn-block" type="submit" id="signup" tabIndex={80}>Sign up</button>
  											<button className="btn btn-block" type="button" id="signup-login" onClick={this.handleAction.bind(this)} tabIndex={85}>Back to Login</button>
  										</div>
  									</form>
  								</div>

  								<div className="forgot-view"  style={hidden}>
  									<p className="forgot-copy">This will send a message to your registered account e-mail address, allowing you to reset your password.</p>
  									<form className="form-horizontal forgot-form" id="forgot-form">
  										<div className="form-group">
  											<label htmlFor="forgot-name" className="sr-only">User name</label>
  											<div className="input-group">
  												<div className="input-group-prepend login-name-addon">
  													<span className="input-group-text">
  														<span className="fa fa-envelope-o" aria-hidden="true"/>
  													</span>
  												</div>
  												<input type="email" id="forgot-email" pattern={rfc5322} className="form-control" tabIndex={90} placeholder="E-mail"  data-error="An email address is required." required/>
  											</div>
  											<span className="help-block with-errors"></span>
  										</div>
  										<div className="form-group">
  											<button className="btn btn-primary btn-block" type="submit" id="forgot" tabIndex={95}>Send e-mail</button>
  											<button className="btn btn-block" type="button" id="forgot-login" onClick={this.handleAction.bind(this)} tabIndex={100}>Back to Login</button>
  										</div>
  									</form>
  								</div>

  							</div>
  						</div>
  					</div>
  					<div className="col-md-4"></div>
  				</div>
  				<div className="footer">
  					<p>
  						<span className="glyphicon glyphicon-copyright-mark" aria-hidden="true"></span> 2019 Nigel Daniels <a id="cookies">Cookie Policy</a>
  					</p>
  				</div>
  			</div>;
  		}
    }
	}
};

LoginView.propTypes = {
	isworking:	PropTypes.bool,
	loggedin:	PropTypes.bool,
	err:		PropTypes.string,

	login:		PropTypes.func
};

export default LoginView;
