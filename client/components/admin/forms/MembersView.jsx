/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Member from '../modals/Member';
import Debug from 'debug';
import {rfc5322} from '../../constants';

let debug = Debug('MembersView');

class MembersView extends Component {

	componentDidMount() {
		debug('componentDidMount, called.');
		this.props.getMembers(this.props.org._id);
	}

	componentDidUpdate() {
		debug('componentDidUpdate, called.');
		if (!this.props.isworking) {
			if (!this.userTable) {
				this.createDataTable(this.props.members);
			} else {
				this.userTable.destroy();
				this.createDataTable(this.props.members);
			}
		}
	}

	createDataTable(data) {
		debug('createDataTable, called.');
		debug('createDataTable, data: ' + JSON.stringify(data));
		this.userTable = $('#user-table').DataTable({
			select: 'single',
			data: data,
			columns: [
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
			let selected = table.data();
			debug('select, ' + JSON.stringify(selected));
			this.props.getSelectedMember(selected._id);

			if (selected.role === 'SUPER') {
				if (this.props.profile.role === 'SUPER') {
					debug('select, show modal.');
					$('#member-modal').modal('show');
				}
			} else {
				debug('select, show modal.');
				$('#member-modal').modal('show');
			}
		});
	}

  	render () {
    	debug('render, called.');
		return 	<div>
			<h5>{this.props.org.name} Organisation Members</h5><br/>
			<table className="table table-striped table-hover" id="user-table"></table>
			<Member/>
		</div>;
	}
};

MembersView.propTypes = {
	isworking:		PropTypes.bool,
	profile:		PropTypes.object,
	org:			PropTypes.object,
	members:		PropTypes.array,

	getMembers: 		PropTypes.func,
	getSelectedMember:	PropTypes.func
};

export default MembersView;
