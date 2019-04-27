/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Organisation from '../modals/Organisation';
import Debug from 'debug';

let debug = Debug('OrganisationView');

class AdminOrganisationView extends Component {

	shouldComponentUpdate() {
		debug('shouldComponentUpdate, called.');
		return this.props.loadingOrgs;
	}

	componentDidMount() {
		debug('componentDidMount, called.');
		this.props.getOrgs();

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
		if (!this.orgTable) {
			this.createDataTable(this.props.orgs);
		} else {
			this.orgTable.destroy();
			this.createDataTable(this.props.orgs);
		}
	}

	createDataTable(data) {
		debug('createDataTable, called.');
		this.orgTable = $('#org-table').DataTable({
			select: 'single',
			data: data,
			columns: [
				{
					data: 'name',
					title: 'Organisation'
				}
			]
		});

		this.orgTable.on( 'select', ( event, table, type, indexes ) => {
			if (!this.props.loadingOrgs) { // We need this to ensure a redraw does recall while we load!
				let selected = table.data();
				debug('select, ' + JSON.stringify(selected));
				this.props.getSelectedOrg(selected._id);
				debug('select callback, show modal.');
				$('#org-modal').modal('show');
			}
		});
	}

  	render () {
    	debug('render, called.');
		return 	<div>
			<h5>Organisations</h5><br/>
			<table className="table table-striped table-hover" id="org-table" style={{'width' : '100%'}}></table>
			<Organisation/>
		</div>;
	}
};

AdminOrganisationView.propTypes = {
	loadingOrgs:	PropTypes.bool,
	orgs:			PropTypes.array,
	err: 			PropTypes.string,

	getOrgs:		PropTypes.func,
	getSelectedOrg:	PropTypes.func
};

export default AdminOrganisationView;
