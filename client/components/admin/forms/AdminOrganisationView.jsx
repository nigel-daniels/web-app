/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

let debug = Debug('OrganisationView');

class AdminOrganisationView extends Component {

	shouldComponentUpdate() {
		debug('shouldComponentUpdate, called.');
		return this.props.isworking;
	}

	componentDidMount() {
		debug('componentDidMount, called.');

		debug('componentDidMount, set validator on signup-form.');
		$('#organisation-form').validator()
			.on('submit', (event) => {
				debug('update, submit');
				if (!event.isDefaultPrevented()) {
					event.preventDefault();
					this.props.updateOrgAdmin(this.props.org._id, $('#name').val());
				}
			})
			.off('input.bs.validator change.bs.validator focusout.bs.validator');
	}

  	render () {
    	debug('render, called.');
		debug('render, org: ' + JSON.stringify(this.props.org));
    	if (this.props.org) {
			//debug('render, org: ' + JSON.stringify(this.props.org));
			return 	<form className="form-horizontal" id="organisation-form">
				<div className="form-group row">
					<label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
					<div className="col-sm-9 form-group input-block">
						<input type="text" className="form-control" id="name" tabIndex={5} placeholder="The organisations name." defaultValue={this.props.org.name} data-error="A first name is required." required/>
						<span className="help-block with-errors"></span>
					</div>
				</div>

				<div className="form-group row">
					<span className="col-sm-3"></span>
					<div className="col-sm-9 btn-set">
						<button type="submit" className="btn btn-primary" id="update" tabIndex={10}>Update</button>
					</div>
				</div>
			</form>;
    	} else {
    		return null;
	  	}
	}
};

AdminOrganisationView.propTypes = {
	isworking:		PropTypes.bool,
	org:			PropTypes.object,

	updateOrgAdmin: PropTypes.func
};

export default AdminOrganisationView;
