/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { Main } from '../Main';

let debug = Debug('DashboardView');

class DashboardView extends Component {

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

	render () {
		debug('render, called.');
  		return 	<Main>
  			<h4>Dashboard page content!</h4>
  		</Main>;
	}
};

DashboardView.propTypes = {
	isworking:		PropTypes.bool,
	err:			PropTypes.string
};

export default DashboardView;
