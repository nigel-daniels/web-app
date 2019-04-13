/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import {rfc5322} from '../../constants';

let debug = Debug('MemberView');

export class MemberView extends Component {
	constructor(props) {
		super(props);
		debug('constructor, called.');
		debug('set role: ' + this.props.selectedMember.role);
		this.state = {role: this.props.selectedMember.role};
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

		debug('componentDidMount, set validator on signup-form.');
		$('#member-update').click(() => {
			debug('update, clicked.');
    		this.props.updateMember(this.props.selectedMember._id, $('#first-name').val(), $('#last-name').val(), $('#email').val(), this.props.selectedMember.org_id, $('#role').val());
  		});

		$('#closeMemberAccount').click(() => {
			debug('close, clicked.');
    		this.props.closeMemberAccount(this.props.selectedMember._id);
  		});
	}

	updateRole(event) {
		debug('updateRole, called.');
		debug('set role: ' + event.target.value);
		setState({role: event.target.value});
	}

	render () {
		debug('render, called.');
		return <div className="modal fade" id="member-modal" tabIndex="-1" role="dialog" aria-labelledby="member-title" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="member-title">Members Account</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<form className="form-horizontal" id="profile-form">
							<div className="form-group row">
								<label htmlFor="first-name" className="col-sm-3 col-form-label">Name</label>
								<div className="col-sm-9 form-group input-block">
									<input type="text" className="form-control" id="first-name" tabIndex={5} placeholder="First name." defaultValue={this.props.selectedMember.firstName} data-error="A first name is required." required/>
									<input type="text" className="form-control" id="last-name" tabIndex={10} placeholder="Last name." defaultValue={this.props.selectedMember.lastName} data-error="A last name is required."required/>
									<span className="help-block with-errors"></span>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
								<div className="col-sm-9 form-group input-block">
									<input type="email" className="form-control" id="email" tabIndex={20} pattern={rfc5322} placeholder="Your e-mail" defaultValue={this.props.selectedMember.email} data-error="A valid e-mail is required." required/>
									<input type="email" className="form-control" id="email2" tabIndex={25} pattern={rfc5322} placeholder="Validate e-mail" defaultValue={this.props.selectedMember.email} data-error="A valid e-mail is required." data-match="#email" data-match-error="The e-mails do not match." required/>
									<span className="help-block with-errors"></span>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="role" className="col-sm-3 col-form-label">Role</label>
								<div className="col-sm-9 form-group input-block">
									<select className="form-control" id="role" value={this.state.role} onChange={this.updateRole}>
										<option value="STAFF">Staff</option>
										<option value="ADMIN">Administrator</option>
										<option value="SUPER">Super User</option>
									</select>
								</div>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button type="button" id="member-update" className="btn btn-primary" data-dismiss="modal">Update</button>
						<button type="button" id="member-cancel" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
						<button type="button" id="member-close" className="btn btn-outline-danger" data-dismiss="modal">Close Account</button>
					</div>
				</div>
			</div>
		</div>;
	}
}

MemberView.propTypes = {
	err:				PropTypes.string,
	selectedMember:		PropTypes.object,

	updateMember:		PropTypes.func,
	closeMemberAccount: PropTypes.func
};

export default MemberView;
