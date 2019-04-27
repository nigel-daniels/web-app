/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { Main } from '../Main';
import SuperMembers from './forms/SuperMembers';
import AdminMembers from './forms/AdminMembers';
import AdminOrganisation from './forms/AdminOrganisation';

let debug = Debug('AdminView');

class AdminView extends Component {

	shouldComponentUpdate() {
		debug('shouldComponentUpdate, called.');
		return this.props.isworking;
	}

	componentDidUpdate() {
		debug('componentDidUpdate, check if there is an err then notify if there is.');
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

	getMemberComponent() {
		return this.props.profile.role === 'SUPER' ? <SuperMembers/> : <AdminMembers/>;
	}

  	render () {
    	debug('render, called.');
		return 	<Main>
			<div id="profile" className="page-content">
				<h4 className="content-heading">Administration</h4>
				<ul className="nav nav-tabs" id="admin-tab" role="tablist">
					<li className="nav-item">
						<a className="nav-link active" id="users-tab" data-toggle="tab" href="#users" role="tab" aria-controls="users" aria-selected="true">Members</a>
					</li>
					<li className="nav-item">
				    	<a className="nav-link" id="org-tab" data-toggle="tab" href="#org" role="tab" aria-controls="org" aria-selected="false">Organisation</a>
					</li>
				</ul>
				<div className="tab-content" id="admin-content">
					<div className="tab-pane fade show active" id="users" role="tabpanel" aria-labelledby="users-tab">
						{this.getMemberComponent()}
					</div>
					<div className="tab-pane fade" id="org" role="tabpanel" aria-labelledby="org-tab">
						<AdminOrganisation/>
					</div>
				</div>
			</div>
		</Main>;
	}
};

AdminView.propTypes = {
	profile:		PropTypes.object,
	isworking:		PropTypes.bool,
	err:			PropTypes.string
};

export default AdminView;
