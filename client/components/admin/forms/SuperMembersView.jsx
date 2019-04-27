/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Member from '../modals/Member';
import Invite from '../modals/Invite';
import Debug from 'debug';

let debug = Debug('MembersView');

class SuperMembersView extends Component {

	shouldComponentUpdate() {
		debug('shouldComponentUpdate, called.');
		return this.props.loadingMembers;
	}

	componentDidMount() {
		debug('componentDidMount, called.');
		this.props.getAllMembers();

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

	componentDidUpdate() {
		debug('componentDidUpdate, called.');
		if (!this.userTable) {
			this.createDataTable(this.props.members);
		} else {
			this.userTable.destroy();
			this.createDataTable(this.props.members);
		}
	}

	createDataTable(data) {
		debug('createDataTable, called.');
		this.userTable = $('#user-table').DataTable({
			select: 'single',
			data: data,
			columns: [
				{
					data: 'org_name',
					title: 'Organisation'
				},
				{
					data: 'firstName',
					title: 'First Name'
				},
				{
					data: 'lastName',
					title: 'Last Name'
				},
				{
					data: 'email',
					title: 'E-mail',
					orderable: false
				},
				{
					data: 'role',
					title: 'Role',
					className: 'dt-center',
					searchable: false,
					render:	(data) => {
						var result = '<span class="fa fa-user" aria-hidden="true"></span> Staff';
						switch (data) {
						case 'SUPER':
							result = '<span class="fa fa-cogs" aria-hidden="true"></span> Super User';
							break;
						case 'ADMIN':
							result = '<span class="fa fa-cog" aria-hidden="true"></span> Administrator';
							break;
						};
						return result;
					}
				}
			]
		});

		this.userTable.on( 'select', ( event, table, type, indexes ) => {
			if (!this.props.loadingMembers) { // We need this to ensure a redraw does recall while we load!
				let selected = table.data();
				debug('select, ' + JSON.stringify(selected));
				this.props.getSelectedMember(selected._id);
				if ((selected.role !== 'SUPER') || (this.props.profile.role === 'SUPER')) {
					debug('select callback, show modal.');
					$('#member-modal').modal('show');
				}
			}
		});
	}

  	render () {
    	debug('render, called.');
		debug('render table');
		if (this.props.org) {
			return 	<div>
				<h5>All Members</h5><br/>
				<table className="table table-striped table-hover" id="user-table" style={{'width' : '100%'}}></table>
				<Member/>
			</div>;
		} else {
			return null;
		}
	}
};

SuperMembersView.propTypes = {
	loadingMembers:	PropTypes.bool,
	profile:		PropTypes.object,
	org:			PropTypes.object,
	members:		PropTypes.array,
	err:			PropTypes.string,

	getAllMembers: 		PropTypes.func,
	getSelectedMember:	PropTypes.func
};

export default SuperMembersView;
