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
  			return 	<form>
				<div className="form-group row">
					<label for="first-name" className="col-sm-3 col-form-label">First Name</label>
					<div className="col-sm-9">
						<input type="text" className="form-control" id="first-name" placeholder="Your first name."/>
					</div>
				</div>
				<div className="form-group row">
					<label for="last-name" className="col-sm-3 col-form-label">Last Name</label>
					<div className="col-sm-9">
						<input type="text" className="form-control" id="last-name" placeholder="Your last name."/>
					</div>
				</div>
				<div className="form-group row">
					<label for="organisation" className="col-sm-3 col-form-label">Organisation</label>
					<div className="col-sm-9">
						<input type="text" className="form-control" id="organisation" placeholder="Your organisation." readonly/>
					</div>
				</div>
				<div className="form-group row">
					<label for="email" className="col-sm-3 col-form-label">Email</label>
					<div className="col-sm-9">
						<input type="email" className="form-control" id="email" placeholder="Email"/>
					</div>
				</div>
				<div className="form-group row">
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
	loggedin:		PropTypes.bool,
	profile:		PropTypes.object,
	err:			PropTypes.string,

	updateProfile: 	PropTypes.func,
	closeAccount:	PropTypes.func
};

export default DetailsView;
