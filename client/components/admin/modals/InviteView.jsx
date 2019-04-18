/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import {rfc5322} from '../../constants';

let debug = Debug('InviteView');

export class InviteView extends Component {

	shouldComponentUpdate() {
		debug('shouldComponentUpdate, called.');
		return this.props.isworking;
	}

	componentDidMount() {
		debug('componentDidMount, called.');
		if (this.props.err !== null) {
			$.notify({
				title: '<strong>Signup Error</strong>',
				icon: 'fa fa-exclamation-triangle',
				message: this.props.err
			},{
				type: 'danger'
			});
		}

		debug('componentDidMount, set validator on invite-form.');
		$('#invite-form').validator()
			.on('submit', (event) => {
				debug('update, submit');
				if (!event.isDefaultPrevented()) {
					event.preventDefault();
					this.props.invite($('#invite-email').val());
					$('#invite-modal').modal('hide');
				}
			})
			.off('input.bs.validator change.bs.validator focusout.bs.validator');
	}

	render () {
		debug('render, called.');
		return <div>
			<button type="button" id="member-invite" className="btn btn-primary" data-toggle="modal" data-target="#invite-modal">Invite New Member</button>
			<div className="modal fade" id="invite-modal" tabIndex="-1" role="dialog" aria-labelledby="invite-title" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="invite-title">Invite New Member</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<form className="form-horizontal" id="invite-form">
							<div className="modal-body">
								<div className="form-group row">
									<label htmlFor="invite-email" className="col-sm-3 col-form-label">E-mail</label>
									<div className="col-sm-9 form-group input-block">
										<input type="email" className="form-control" id="invite-email" tabIndex={20} pattern={rfc5322} placeholder="An e-mail address" data-error="A valid e-mail is required." required/>
										<input type="email" className="form-control" id="invite-email2" tabIndex={25} pattern={rfc5322} placeholder="Validate the e-mail address" data-error="A valid e-mail is required." data-match="#invite-email" data-match-error="The e-mails do not match." required/>
										<span className="help-block with-errors"></span>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button type="submit" id="invite-invite" className="btn btn-primary">Invite</button>
								<button type="button" id="invite-cancel" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>;
	}
}

InviteView.propTypes = {
	isworking:			PropTypes.bool,
	err:				PropTypes.string,

	invite:		PropTypes.func
};

export default InviteView;
