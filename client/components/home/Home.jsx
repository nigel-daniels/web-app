/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React from 'react';
import Debug from 'debug';

import { Main } from '../Main';

let debug = Debug('Home');

export class Home extends React.Component {
	render () {

		debug('render, called.');
		return 	<Main>
			<h4>Home page content!</h4>
		</Main>;
	}
}
