/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

let debug = Debug('ForgotView');

class ForgotView extends Component {
    componentDidMount() {
		debug('componentDidMount, called.');

		debug('componentDidMount, activate tooltips.');
		$(function () {
			$('[data-toggle="tooltip"]').popover();
		});

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

  	render () {
        debug('render, called.');

        const rfc5322 = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\' +
					'x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9]' +
					'(?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4]' +
					'[0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]' +
					')|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\' +
					'x0b\\x0c\\x0e-\\x7f])+)\\])';


		return 	<form className="form-horizontal forgot-form" id="forgot-form">
            <div className="form-group">
                <label htmlfor="forgot-email" className="sr-only">Email</label>
                <div className="input-group">
                    <div className="input-group-prepend login-name-addon">
                        <span className="input-group-text">
                            <span className="fa fa-envelope-o" aria-hidden="true"/>
                        </span>
                    </div>
                    <input type="email" id="forgot-email" pattern={rfc5322} className="form-control" tabIndex={90} placeholder="Login E-mail"  data-error="An email address is required." required/>
                </div>
                <span className="help-block with-errors"></span>
            </div>
            <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit" id="forgot" tabIndex={95}>Send e-mail</button>
            </div>
        </form>;
	}
};

ForgotView.propTypes = {
	forgot:		PropTypes.func
};

export default ForgotView;
