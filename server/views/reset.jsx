/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React from 'react';
import Debug from 'debug';

let debug = Debug('Reset');

export default class Reset extends React.Component {

	render () {
		debug('rendering');
		debug('env = ' + this.props.env);
		debug('id = ' + this.props.id);
		return (
			<html lang="en">
				<head>
					<meta charSet="utf-8"/>
					<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

					<title>Base Web App</title>
				</head>

				<body>
					<div id="app">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-4"></div>
								<div className="col-md-4">
									<div className="login-brand">
										<div className="row">
											<span className="col-xs-2 login-logo">
												<img alt="Logo" src="/../images/saic.png" height="40" width="40"/>
											</span>
											<span className="col-xs-10 login-main-title">
												<h1>Web App Demo</h1>
											</span>
										</div>
									</div>
									<div className="panel panel-default login-panel">
										<div className="panel-heading">
											<h2 className="panel-title login-title">Reset Password</h2>
										</div>
										<div className="panel-body">

											<div className="login-view">
												<form className="form-horizontal reset-form" id="reset-form" method='POST'>
													<div className="form-group input-block-ico">
														<label htmlFor="password" className="sr-only">Password</label>
														<div className="input-group" data-toggle="tooltip" title="Password must contain one or more upper case, lower case, number/special characters and be at least 8 characters long to be valid.">
															<div className="input-group-prepend login-name-addon">
																<span className="input-group-text">
																	<span className="fa fa-key" aria-hidden="true"/>
																</span>
															</div>
															<input type="password" id="password" name="password" className="form-control" tabIndex={55} placeholder="Password" data-error="A valid password is required." required/>
														</div>
														<div className="input-group">
															<div className="input-group-prepend login-name-addon">
																<span className="input-group-text">
																	<span className="fa fa-key" aria-hidden="true"/>
																</span>
															</div>
															<input type="password" id="password2" className="form-control" tabIndex={60} placeholder="Validate password" data-error="A confirmation password is required." data-match="#password" data-match-error="The passwords do not match." required/>
														</div>
														<span className="help-block with-errors"></span>
													</div>
													<div className="form-group">
														<button className="btn btn-primary btn-block" type="submit" id="reset" tabIndex={80}>Reset</button>
													</div>
												</form>
												<div className="row login-footer">
													<div className="col-md-6 login-footer-left">
														<a id="reset-login" href="/" tabIndex={100}>Go to Login</a>
													</div>
												</div>
											</div>

										</div>
									</div>
								</div>
								<div className="col-md-4"></div>
							</div>
							<div className="footer">
								<p>
									(c)2019 Nigel Daniels.
								</p>
							</div>
						</div>
					</div>
				</body>
			</html>
		);
	}
}
