/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { AuthRoute } from './auth/AuthRoute';
import Login from './auth/Login';
import { Home } from './home/Home';
import { Action1 } from './action/Action1';
import { About } from './about/About';
import { NotFound } from './notfound/NotFound';
import Debug from 'debug';

let debug = Debug('App');

export class App extends React.Component{
	render () {
		debug('render, called.');
		return 	<BrowserRouter>
			<Switch>
				<AuthRoute exact path='/' component={Login}/>
				<AuthRoute exact path='/home' component={Home}/>
				<AuthRoute path='/action' component={Action1}/>
				<AuthRoute path='/about' component={About}/>
				<Route path='/login' component={Login}/>
				<Route component={NotFound}/>
			</Switch>
		</BrowserRouter>;
	}
}
