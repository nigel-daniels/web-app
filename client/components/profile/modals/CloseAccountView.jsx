/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

let debug = Debug('CloseAccountView');

export class CloseAccountView extends Component {
	closeAc() {
		this.props.closeAccount(this.props.profile._id);
	}

	render () {
		debug('render, called.');
		return <div className="modal fade" id="close-modal" tabIndex="-1" role="dialog" aria-labelledby="close-title" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered" role="document">
		  		<div className="modal-content">
		      		<div className="modal-header">
		        		<h5 className="modal-title" id="close-title">Close Account</h5>
		        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
		          			<span aria-hidden="true">&times;</span>
		        		</button>
		      		</div>
		      		<div className="modal-body">
						This will close this account, the account is recoverable but after this action you will not be able to access the acount unless the administrator reactivates it.  To delete an account please contact your administrator.
		      		</div>
		      		<div className="modal-footer">
						<button type="button" className="btn btn-primary" data-dismiss="modal">Cancel</button>
		        		<button type="button" className="btn btn-outline-danger" data-dismiss="modal">Close Account</button>
		      		</div>
		    	</div>
		  	</div>
		</div>;
	}
}

CloseAccountView.propTypes = {
	//isworking:		PropTypes.bool,
	profile:		PropTypes.object,

	closeAccount: 	PropTypes.func//,
	//closeAccount:	PropTypes.func
};

export default CloseAccountView;
