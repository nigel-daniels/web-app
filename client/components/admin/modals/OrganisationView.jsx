/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

let debug = Debug('OrganisationView');

export class OrganisationView extends Component {

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

	getBody() {
		if (this.props.selectedOrg) {
			return (<div className="modal-body">
				<form className="form-horizontal" id="organisation-form" key={this.props.selectedOrg._id}>
					<div className="form-group row">
						<label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
						<div className="col-sm-9 form-group input-block">
							<input type="text" className="form-control" id="name" tabIndex={5} placeholder="Organisation name." defaultValue={this.props.selectedOrg.name} data-error="A name is required." required/>
							<span className="help-block with-errors"></span>
						</div>
					</div>
				</form>
			</div>);
		} else {
			return (<div className="modal-body">
				<form className="form-horizontal" id="org-form">
				Loading ...
				</form>
			</div>);
		}
	}

	handleUpdate () {
		this.props.updateOrgSuper(this.props.selectedOrg._id, $('#name').val());
	}

	render () {
		debug('render, called.');
		return <div className="modal fade" id="org-modal" tabIndex="-1" role="dialog" aria-labelledby="org-title" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="org-title">Organisation</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					{this.getBody()}
					<div className="modal-footer">
						<button type="submit" id="org-update" className="btn btn-primary" onClick={this.handleUpdate.bind(this)} data-dismiss="modal">Update</button>
						<button type="button" id="org-cancel" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</div>;
	}
}

OrganisationView.propTypes = {
	isworking:			PropTypes.bool,
	err:				PropTypes.string,
	selectedOrg:		PropTypes.object,

	updateOrgSuper:		PropTypes.func
};

export default OrganisationView;
