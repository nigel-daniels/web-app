/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React from 'react';
import MainMenu from './MainMenu';
import Debug from 'debug';

let debug = Debug('Main');

export class Main extends React.Component{

	render () {
		debug('render, called.');
		debug('render, props: ' + this.props);
		return 	<div>
			<MainMenu/>
			{this.props.children}
		</div>;
	}
}
