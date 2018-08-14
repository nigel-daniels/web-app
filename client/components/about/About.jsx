/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React from 'react';
import Debug from 'debug';

import { Main } from '../Main';

let debug = Debug('About');
debug.enabled = window.debug;

export class About extends React.Component {
	render () {
		debug('render, called.');
		return 	<Main>
			<h4>About page content!</h4>
		</Main>;
	}
}
