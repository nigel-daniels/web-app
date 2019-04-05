/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { Main } from '../../Main';

let debug = Debug('PasswordView');

class PasswordView extends Component {
  	render () {
    	debug('render, called.');
    	if (this.props.isworking) {
      	return null;
    	} else {
        debug('render, profile: ' + JSON.stringify(this.props.profile));
  			return 	<form>
                <div className="form-group row">
                    <label htlmfor="current-password" className="col-sm-3 col-form-label">Current Password</label>
                    <div className="col-sm-9">
                        <input type="password" className="form-control" id="current-password" placeholder="Your current password."/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htlmfor="new-password" className="col-sm-3 col-form-label">New Password</label>
                    <div className="col-sm-9 form-group input-block">
                        <input type="password" className="form-control" id="new-password" placeholder="Type new password."/>
						<input type="password2" className="form-control" id="new-password" placeholder="Validate new password."/>
                    </div>
                </div>
                <div className="form-group row">
					<span className="col-sm-3"></span>
                    <div className="col-sm-9">
                        <button type="submit" className="btn btn-primary">Change</button>
                    </div>
                </div>
            </form>;
	  	}
	}
};

PasswordView.propTypes = {
	isworking:		PropTypes.bool,
	profile:		PropTypes.object,

	changePassword: 	PropTypes.func
};

export default PasswordView;
