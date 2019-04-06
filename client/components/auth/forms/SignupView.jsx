/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {passwordPattern, rfc5322} from '../../constants';
import {Terms} from '../modals/Terms';
import {Privacy} from '../modals/Privacy';
import Debug from 'debug';

let debug = Debug('SignupView');

class SignupView extends Component {

	componentDidMount() {
		debug('componentDidMount, called.');

		debug('componentDidMount, activate tooltips.');
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});

		debug('componentDidMount, set validator on signup-form.');
		$('#signup-form').validator()
			.on('submit', (event) => {
				debug('submit, validate and submit.');
				if (!event.isDefaultPrevented()) {
					event.preventDefault();
					this.props.signup($('#firstName').val(), $('#lastName').val(),
						$('#organisation').val(), $('#email').val(), $('#password').val());
				}
			})
			.off('input.bs.validator change.bs.validator focusout.bs.validator');
	}

  	render () {
		debug('render, called.');

		return 	<div>
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
	                    <input type="text" id="organisation" className="form-control" tabIndex={40} placeholder="Organisation name" data-error="An organisation is required." required/>
	                </div>
	                <span className="help-block with-errors"></span>
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
	                <input type="checkbox" id="terms" tabIndex={70} data-error="You need to agree to our terms and conditions." required/> I agree to the <a href="#" data-toggle="modal" data-target="#terms-modal">terms and conditions.</a>
	                <span className="help-block with-errors"></span>
	            </div>
	            <div className="form-group">
	                <input type="checkbox" id="privacy" tabIndex={75} data-error="You need to agree to our privacy policy." required/> I agree to the <a  href="#" data-toggle="modal" data-target="#privacy-modal">privacy policy.</a>
	                <span className="help-block with-errors"></span>
	            </div>
	            <div className="form-group">
	                <button className="btn btn-primary btn-block" type="submit" id="signup" tabIndex={80}>Sign up</button>
	            </div>
	        </form>
			<Terms/>
			<Privacy/>
		</div>;
	}
};

SignupView.propTypes = {
	signup:		PropTypes.func
};

export default SignupView;
