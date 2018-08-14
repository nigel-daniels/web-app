/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React from 'react';
import Debug from 'debug';

let debug = Debug('NotFound');

export class NotFound extends React.Component {

	render() {
		debug('render, called.');

		return 	<div className="container-fluid">
			<div className="row">
				<div className="col-md-4"></div>
				<div className="col-md-4">
					<div className="row notfound">
						<h1>404 Page Not Found!</h1>
					</div>
				</div>
				<div className="col-md-4"></div>
			</div>
			<div className="footer">
				<p>
					<span className="glyphicon glyphicon-copyright-mark" aria-hidden="true"></span> 2017 Initiate Thinking <a id="cookies">Cookie Policy</a>
				</p>
			</div>
		</div>;
	}
}
