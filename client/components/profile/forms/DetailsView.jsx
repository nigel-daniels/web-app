/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloseAccount from '../modals/CloseAccount';
import Debug from 'debug';
import {rfc5322} from '../../constants';

let debug = Debug('DetailsView');

class DetailsView extends Component {

	shouldComponentUpdate() {
		debug('shouldComponentUpdate, called.');
		return this.props.isworking;
	}

	componentDidMount() {
		debug('componentDidMount, called.');

		debug('componentDidMount, set validator on signup-form.');
		$('#profile-form').validator()
			.on('submit', (event) => {
				debug('update, submit');
				if (!event.isDefaultPrevented()) {
					event.preventDefault();
					this.props.updateProfile(this.props.profile._id, $('#first-name').val(), $('#last-name').val(),
						$('#email').val(), this.props.profile.org_id, this.props.profile.role);
				}
			})
			.off('input.bs.validator change.bs.validator focusout.bs.validator');
	}

  	render () {
    	debug('render, called.');
    	if (this.props.profile && this.props.org) {
			debug('render, profile: ' + JSON.stringify(this.props.profile));
			debug('render, org: ' + JSON.stringify(this.props.org));
			return 	<form className="form-horizontal" id="profile-form">
				<div className="form-group row">
					<label htmlFor="first-name" className="col-sm-3 col-form-label">Name</label>
					<div className="col-sm-9 form-group input-block">
						<input type="text" className="form-control" id="first-name" tabIndex={5} placeholder="Your first name." defaultValue={this.props.profile.firstName} data-error="A first name is required." required/>
						<input type="text" className="form-control" id="last-name" tabIndex={10} placeholder="Your last name." defaultValue={this.props.profile.lastName} data-error="A last name is required."required/>
						<span className="help-block with-errors"></span>
					</div>
				</div>

				<div className="form-group row">
					<label htmlFor="organisation" className="col-sm-3 col-form-label">Organisation</label>
					<div className="col-sm-9">
						<input type="text" className="form-control" id="organisation" tabIndex={15} placeholder="Your organisation." readOnly defaultValue={this.props.org.name}/>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
					<div className="col-sm-9 form-group input-block">
						<input type="email" className="form-control" id="email" tabIndex={20} pattern={rfc5322} placeholder="Your e-mail" defaultValue={this.props.profile.email} data-error="A valid e-mail is required." required/>
						<input type="email" className="form-control" id="email2" tabIndex={25} pattern={rfc5322} placeholder="Validate e-mail" defaultValue={this.props.profile.email} data-error="A valid e-mail is required." data-match="#email" data-match-error="The e-mails do not match." required/>
						<span className="help-block with-errors"></span>
					</div>
				</div>

				<div className="form-group row">
					<span className="col-sm-3"></span>
					<div className="col-sm-9 btn-set">
						<button type="submit" className="btn btn-primary" id="update" tabIndex={30}>Update</button>
						<button type="button" className="btn btn-outline-danger" id="close" data-toggle="modal" data-target="#close-modal" tabIndex={35}>Close Account</button>
					</div>
				</div>
				<CloseAccount/>
			</form>;
    	} else {
    		return null;
	  	}
	}
};

DetailsView.propTypes = {
	isworking:		PropTypes.bool,
	profile:		PropTypes.object,
	org:			PropTypes.object,

	updateProfile: 	PropTypes.func
};

export default DetailsView;
