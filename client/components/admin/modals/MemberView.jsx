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
	}

	handleUpdate () {
		debug('handleUpdate, called.');
		this.props.updateMember(this.props.selectedMember._id, $('#first-name').val(), $('#last-name').val(), $('#email').val(), this.props.selectedMember.org_id, $('#role').val());
	}

	handleClose() {
		debug('handleCloseAc, called.');
		this.props.closeMemberAccount(this.props.selectedMember._id);
	}

	getBody() {
		if (!this.props.selectedMember._id) {
			return (<div className="modal-body">
				Loading ...
			</div>);
		} else {
			return (<div className="modal-body">
				<form className="form-horizontal" id="profile-form" key={this.props.selectedMember._id}>
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
							{this.getRoleSelector()}
						</div>
					</div>
				</form>
			</div>);
		}
	}

	getFooter() {
		if (!this.props.selectedMember._id) {
			return (<div className="modal-footer">
				<button type="button" id="member-cancel" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
			</div>);
		} else {
			return (<div className="modal-footer">
				<button type="button" id="member-update" className="btn btn-primary" onClick={this.handleUpdate.bind(this)} data-dismiss="modal">Update</button>
				<button type="button" id="member-cancel" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
				<button type="button" id="member-close" className="btn btn-outline-danger" onClick={this.handleClose.bind(this)} data-dismiss="modal">Close Account</button>
			</div>);
		}
	}

	getRoleSelector() {
		debug('getRoleSelector, called.');
		if (this.props.profile.role === 'SUPER') {
			return (<select className="form-control" id="role" defaultValue={this.props.selectedMember.role}>
				<option value="STAFF">Staff</option>
				<option value="ADMIN">Administrator</option>
				<option value="SUPER">Super User</option>
			</select>);
		} else {
			return (<select className="form-control" id="role" defaultValue={this.props.selectedMember.role}>
				<option value="STAFF">Staff</option>
				<option value="ADMIN">Administrator</option>
			</select>);
		}
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
					{this.getBody()}
					{this.getFooter()}
				</div>
			</div>
		</div>;
	}
}

MemberView.propTypes = {
	isworking:			PropTypes.bool,
	err:				PropTypes.string,
	profile:			PropTypes.object,
	selectedMember:		PropTypes.object,

	updateMember:		PropTypes.func,
	closeMemberAccount: PropTypes.func
};

export default MemberView;
