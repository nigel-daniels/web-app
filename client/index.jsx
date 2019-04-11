/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import './css/index.css';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { middleware as pack } from 'redux-pack';
import { App } from './components/App';
import reducer from './reducer';
import 'popper.js';
import '@babel/polyfill';
import 'bootstrap';
import 'bootstrap-validator';
import 'bootstrap-notify';
import 'datatables.net-bs4';
import 'datatables.net-select-bs4';

// Now set up the local debug
import Debug from 'debug';

let debug = Debug('index');

if ($('#app-script').attr('data-env') === 'development') {
	Debug.enable('*');
	debug('debug enabled');
} else {
	Debug.disable();
}

// Ensure the notify is available
debug('setting notify style');
$.notifyDefaults({
	type: 'minimalist'
});

debug('creating redux store');
export const store = createStore(reducer, applyMiddleware(pack));

// Now set up the routing
debug('Rendering provider');
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('app')
);
