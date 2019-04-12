/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import CloseAccount from '../modals/CloseAccount';
import Debug from 'debug';
import {rfc5322} from '../../constants';

let debug = Debug('MembersView');

class MembersView extends Component {

	componentDidMount() {
		debug('componentDidMount, called.');
		this.props.getMembers(this.props.org._id);
	}

	componentDidUpdate() {
		if (!this.props.isworking) {
			this.userTable = $('#user-table').DataTable({
				select: 'single',
				data: this.props.members,
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
				debug('selected: ' + JSON.stringify(table.data()));
			});
		}
	}

  	render () {
    	debug('render, called.');

		debug('render, members: ' + JSON.stringify(this.props.members));
		return 	<div>
			<h5>{this.props.org.name} Organisation Members</h5><br/>
			<table className="table table-striped table-hover" id="user-table"></table>
		</div>;
	}
};

MembersView.propTypes = {
	isworking:		PropTypes.bool,
	org:			PropTypes.object,
	members:		PropTypes.array,

	getMembers: 	PropTypes.func
};

export default MembersView;
