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

	userMenu(role) {
		debug('userMenu, called.');

		if (role === 'STAFF') {
			debug('userMenu, role is user.');
			return (<ul className="navbar-nav ml-auto">
				<li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
				<li className="dropdown-divider"></li>
				<li className="nav-item"><a className="nav-link" href="#" onClick={this.props.logout}>Logout</a></li>
			</ul>);
		} else {
			debug('userMenu, role is admin or super.');
			return (<ul className="navbar-nav ml-auto">
				<li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
				<li className="nav-item"><Link className="nav-link" to="/admin">Administer</Link></li>
				<li className="dropdown-divider"></li>
				<li className="nav-item"><a className="nav-link" href="#" onClick={this.props.logout}>Logout</a></li>
			</ul>);
		}
	}

	render () {
		debug('render, called.');

		const logout = () => {
			this.props.logout();
		};

		if (this.props.loggedin) {
			debug('render, loggedin true.');
			return 	<nav className="navbar navbar-expand-sm navbar-fixed-top navbar-light bg-light">
		        <a className="navbar-brand" href="#">
		          <img alt="SAIC" src="images/saic.png" height="30" width="30"/>
		        </a>
				<button type="button" className="navbar-toggler mr-auto" data-toggle="collapse" data-target="#links" aria-expanded="false" aria-controls="navbarResponsive" aria-label="Toggle navigation">
					<span className="fa fa-bars"></span>
				</button>
        		<button type="button" className="navbar-toggler ml-auto" data-toggle="collapse" data-target="#account" aria-expanded="false" aria-controls="navbarResponsive" aria-label="Toggle navigation">
					<span className="fa fa-user"></span>
				</button>

				<div id="links" className="navbar-collapse collapse">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item"><Link className="nav-link" to='/'>Home</Link></li>
						<li className="nav-item"><Link className="nav-link" to="/action">Action 1</Link></li>
						<li className="nav-item"><Link className="nav-link" to='/about'>About</Link></li>
					</ul>
          		</div>

          		<div id="account" className="navbar-collapse collapse">
					{this.userMenu(this.props.profile.role)}
				</div>

			</nav>;
		}
	}
};

MainMenuView.propTypes = {
	loggedin:	PropTypes.bool,
	profile:	PropTypes.object,

	logout:		PropTypes.func
};

export default MainMenuView;
