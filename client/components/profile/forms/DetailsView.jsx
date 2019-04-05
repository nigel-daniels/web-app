/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { Main } from '../../Main';

let debug = Debug('DetailsView');

class DetailsView extends Component {
  	render () {
    	debug('render, called.');
    	if (this.props.isworking) {
      		return null;
    	} else {
        	debug('render, profile: ' + JSON.stringify(this.props.profile));
  			return 	<form>
				<div className="form-group row">
					<label htlmfor="first-name" className="col-sm-3 col-form-label">First Name</label>
					<div className="col-sm-9">
						<input type="text" className="form-control" id="first-name" placeholder="Your first name." defaultValue={this.props.profile.firstName}/>
					</div>
				</div>
				<div className="form-group row">
					<label htlmfor="last-name" className="col-sm-3 col-form-label">Last Name</label>
					<div className="col-sm-9">
						<input type="text" className="form-control" id="last-name" placeholder="Your last name." defaultValue={this.props.profile.lastName}/>
					</div>
				</div>
				<div className="form-group row">
					<label htlmfor="organisation" className="col-sm-3 col-form-label">Organisation</label>
					<div className="col-sm-9">
						<input type="text" className="form-control" id="organisation" placeholder="Your organisation." readOnly defaultValue={this.props.profile.organisation}/>
					</div>
				</div>
				<div className="form-group row">
					<label htlmfor="email" className="col-sm-3 col-form-label">Email</label>
					<div className="col-sm-9 form-group input-block">
						<input type="email" className="form-control" id="email" placeholder="Your e-mail" defaultValue={this.props.profile.email}/>
						<input type="email" className="form-control" id="email2" placeholder="Validate e-mail" defaultValue={this.props.profile.email}/>
					</div>
				</div>
				<div className="form-group row">
					<span className="col-sm-3"></span>
					<div className="col-sm-9">
						<button type="submit" className="btn btn-primary">Update</button>
					</div>
				</div>
			</form>;
	  	}
	}
};

DetailsView.propTypes = {
	isworking:		PropTypes.bool,
	profile:		PropTypes.object,

	updateProfile: 	PropTypes.func,
	closeAccount:	PropTypes.func
};

export default DetailsView;
