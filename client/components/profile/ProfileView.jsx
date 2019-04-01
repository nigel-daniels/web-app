/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React from 'react';
import Debug from 'debug';

import { Main } from '../Main';

let debug = Debug('ProfileView');

export class Profile extends React.Component {
	render () {

		debug('render, called.');
	    if (this.props.isworking) {
	      return null;
	    } else {
	  		return 	<Main>
	  			<h4>Profile page content!</h4>
	  		</Main>;
	  }
	}
}
