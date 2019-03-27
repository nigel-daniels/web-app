/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import Debug from 'debug';

let debug = Debug('MainMenuView');

class MainMenuView extends Component {

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

	userMenu(role) {
		debug('userMenu, called.');

		if (role === 'STAFF') {
			debug('userMenu, role is user.');
			return (<ul className="dropdown-menu">
				<li><Link to="/profile">Profile</Link></li>
				<li role="separator" className="divider"></li>
				<li><a href="#" onClick={this.props.logout}>Logout</a></li>
			</ul>);
		} else {
			debug('userMenu, role is admin or super.');
			return (<ul className="dropdown-menu">
				<li><Link to="/profile">Profile</Link></li>
				<li role="separator" className="divider"></li>
				<li><Link to="/admin">Administer</Link></li>
				<li role="separator" className="divider"></li>
				<li><a href="#" onClick={this.props.logout}>Logout</a></li>
			</ul>);
		}
	}

	render () {
		debug('render, called.');
		//debug('props: ' + this.props);

		const logout = () => {
			this.props.logout();
		};

		if (this.props.loggedin) {
			debug('render, loggedin true.');
			return 	<nav className="navbar navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="https://www.initiatethinking.com/">
							<img alt="Initiate Thinking Logo" src="images/happy.png" height="30"/>
						</a>
					</div>
					<div id="navbar" className="navbar-collapse collapse">
						<ul className="nav navbar-nav">
							<li><Link to='/'>Home</Link></li>
							<li><Link to="/action">Action 1</Link></li>
							<li><Link to='/about'>About</Link></li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
									<span className="glyphicon glyphicon-user" aria-hidden="true"></span>
									<span className="caret"></span>
								</a>
								{this.userMenu('STAFF')}
							</li>
						</ul>
					</div>
				</div>
			</nav>;
		} else {
			debug('render, loggedin false, redirecting to \'/login\'.');
			return <Redirect to={{ pathname: '/login' }} />;
		}


	}
};

MainMenuView.propTypes = {
	isworking:	PropTypes.bool,
	loggedin:	PropTypes.bool,
	err:		PropTypes.string,

	logout:		PropTypes.func
};

export default MainMenuView;
