/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import React, { Component } from 'react';
import Debug from 'debug';

let debug = Debug('Terms');
//debug.enabled = window.debug;

export class Terms extends Component {
	render () {
		debug('render, called.');
		return <div className="modal fade" id="terms-modal" tabIndex="-1" role="dialog" aria-labelledby="terms-title" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
		  		<div className="modal-content">
		      		<div className="modal-header">
		        		<h5 className="modal-title" id="terms-title">Terms and Conditions</h5>
		        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
		          			<span aria-hidden="true">&times;</span>
		        		</button>
		      		</div>
		      		<div className="modal-body">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel blandit metus. Curabitur sit amet odio nec tortor pulvinar pulvinar id non tellus. Nunc fermentum tincidunt venenatis. Maecenas et diam quis est pharetra eleifend. Etiam sollicitudin, ex vel eleifend suscipit, nibh ligula rutrum tortor, vel hendrerit velit enim vel arcu. Nullam et quam ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in diam sodales, laoreet enim quis, efficitur ex. Ut ante mi, maximus non tellus ullamcorper, elementum eleifend ex. Quisque id velit dignissim odio dignissim rhoncus. Sed faucibus ut tortor et molestie. Nulla convallis aliquam sapien at placerat. Donec vulputate non massa eget gravida. Cras auctor eros risus, sed consequat odio gravida venenatis. Mauris tincidunt condimentum turpis, a commodo lectus ultrices vehicula.
						Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis, libero in porttitor efficitur, massa ante tempor neque, quis pharetra sapien sapien at risus. Suspendisse efficitur leo bibendum enim mollis hendrerit. Vivamus urna massa, mollis non finibus ut, vehicula ac leo. Nullam ornare metus eu porta varius. Aliquam fringilla nisl a faucibus iaculis.
		      		</div>
		      		<div className="modal-footer">
		        		<button type="button" className="btn btn-secondary" data-dismiss="modal">Done</button>
		      		</div>
		    	</div>
		  	</div>
		</div>;
    }
}
