/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

let debug = Debug('LoginView');

class LoginView extends Component {
    componentDidMount() {
		debug('componentDidMount, called.');

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
	}

  	render () {
        debug('render, called.');
        const rfc5322 = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\' +
					'x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9]' +
					'(?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4]' +
					'[0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]' +
					')|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\' +
					'x0b\\x0c\\x0e-\\x7f])+)\\])';

		return 	<form className="form-horizontal login-form" id="login-form">
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
        </form>;
	}
};

LoginView.propTypes = {
	login:		PropTypes.func
};

export default LoginView;
